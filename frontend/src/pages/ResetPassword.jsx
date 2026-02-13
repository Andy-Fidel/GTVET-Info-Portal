import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Loader, Lock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        token: searchParams.get('token') || '',
        email: searchParams.get('email') || '',
        password: '',
        password_confirmation: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!formData.token || !formData.email) {
            setError('Invalid or missing password reset parameters.')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        setError('')

        try {
            await authAPI.resetPassword(formData)
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 px-4 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />

            <div className="w-full max-w-[420px] relative">
                <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold">New Security Key</CardTitle>
                        <CardDescription>Finalize your credentials update</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="text-center py-6 space-y-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/10">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Access Restored</h3>
                                    <p className="text-sm text-slate-500 font-medium">
                                        Your password has been updated. Redirecting to login...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            type="password"
                                            placeholder="••••••••••••"
                                            className="pl-11 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm New Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            type="password"
                                            placeholder="••••••••••••"
                                            className="pl-11 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl"
                                            value={formData.password_confirmation}
                                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
                                    disabled={loading || !!error}
                                >
                                    {loading ? (
                                        <Loader className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            Update Security Key
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>

                                <Link to="/login" className="block text-center text-xs font-semibold text-slate-500 hover:text-primary transition-colors py-2">
                                    Cancel and return to login
                                </Link>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
