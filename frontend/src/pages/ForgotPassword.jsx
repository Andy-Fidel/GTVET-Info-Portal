import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Loader, Mail, ChevronLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [debugToken, setDebugToken] = useState('') // For development only

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const response = await authAPI.forgotPassword(email)
            setSuccess(true)
            if (response.data.debug_token) {
                setDebugToken(response.data.debug_token)
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Could not process your request')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 px-4 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />

            <div className="w-full max-w-[420px] relative">
                <Link
                    to="/login"
                    className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Back to access portal
                </Link>

                <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader className="space-y-1 pb-6 pt-8">
                        <CardTitle className="text-xl font-bold text-center">Account Recovery</CardTitle>
                        <CardDescription className="text-center">Reset your administrative access key</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="text-center py-4 space-y-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/10 mb-2">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-in zoom-in duration-300" />
                                </div>
                                <div className="space-y-2 px-2">
                                    <h3 className="text-lg font-bold">Email Processed</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        If an account matches <strong>{email}</strong>, you will receive instructions to reset your password shortly.
                                    </p>
                                </div>

                                {debugToken && (
                                    <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                        <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-2">Development Token</p>
                                        <Link
                                            to={`/reset-password?token=${debugToken}&email=${email}`}
                                            className="text-xs font-mono break-all text-primary underline"
                                        >
                                            Process Reset (Dev Shortcut)
                                        </Link>
                                    </div>
                                )}

                                <Button
                                    onClick={() => window.location.href = '/login'}
                                    variant="outline"
                                    className="w-full h-11 rounded-xl font-bold border-slate-200"
                                >
                                    Return to Login
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Enter your registered administrative e-mail address and we'll send you a secure recovery link.
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">E-mail Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            type="email"
                                            placeholder="admin@gtvet.gov.gh"
                                            className="pl-11 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            Send Recovery Link
                                            <Send className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
