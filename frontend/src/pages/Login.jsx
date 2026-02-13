import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAppStore } from '../store/appStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Loader, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const setUser = useAppStore(state => state.setUser)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await authAPI.login({ email, password })
            localStorage.setItem('auth_token', response.data.access_token)
            setUser(response.data.user)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 px-4 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none" />

            <div className="w-full max-w-[420px] relative">
                {/* Logo/Header Area */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-4 drop-shadow-sm">
                        <img src={logo} alt="GTVET Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">GTVET Information Portal</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Administrative Access and Directory Control</p>
                </div>

                <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader className="space-y-1 pb-6 pt-8">
                        <CardTitle className="text-xl font-bold text-center">Authentication Required</CardTitle>
                        <CardDescription className="text-center">Secure access to the information portal</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">E-mail Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your e-mail address"
                                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20 rounded-xl"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Forgot access key?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20 rounded-xl"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        Enter Dashboard
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-center text-slate-400 font-medium px-4 leading-relaxed">
                                Unauthorized access to this portal is strictly prohibited and subject to administrative monitoring.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} GTVET Information Service
                    </p>
                </div>
            </div>
        </div>
    )
}
