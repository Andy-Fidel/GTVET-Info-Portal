import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usersAPI } from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select'
import { Loader, User, Mail, Lock, Phone, Shield, Camera, X, ArrowLeft, Check } from 'lucide-react'

export default function AddUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEdit)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [preview, setPreview] = useState(null)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Staff',
        contact: '',
        profile_picture: null
    })

    const roles = ['Admin', 'Editor', 'Staff', 'Manager']

    useEffect(() => {
        if (isEdit) {
            fetchUser()
        }
    }, [id])

    const fetchUser = async () => {
        try {
            setFetching(true)
            const response = await usersAPI.getById(id)
            const user = response.data.data
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                password: '',
                password_confirmation: '',
                role: user.role || 'Staff',
                contact: user.contact || '',
                profile_picture: null
            })
            if (user.profile_picture_url) {
                setPreview(user.profile_picture_url)
            }
        } catch (err) {
            setError('Failed to fetch user data')
            console.error(err)
        } finally {
            setFetching(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, profile_picture: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match')
            return
        }

        const data = new FormData()
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key])
            }
        })

        try {
            setLoading(true)
            if (isEdit) {
                await usersAPI.update(id, data)
            } else {
                await usersAPI.create(data)
            }
            setSuccess(true)
            setTimeout(() => navigate('/dashboard'), 2000)
        } catch (err) {
            const msg = err.response?.data?.errors
                ? Object.values(err.response.data.errors).flat()[0]
                : 'Failed to save user'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-gray-500">Loading user information...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Button
                        variant="ghost"
                        className="mb-4 -ml-2 text-gray-500 hover:text-primary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Update User Profile' : 'Add New User'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {isEdit ? 'Modify administrative access and personal details' : 'Create a new administrative account'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar: Profile Photo */}
                <div className="lg:col-span-1">
                    <Card className="border-none shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-gray-400">Profile Photo</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full bg-gray-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-20 h-20 text-gray-300" />
                                    )}
                                </div>
                                <label className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
                                    <Camera className="w-5 h-5" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                                {preview && (
                                    <button
                                        type="button"
                                        onClick={() => { setPreview(null); setFormData(prev => ({ ...prev, profile_picture: null })) }}
                                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                                Upload a clear portrait. Max 2MB. JPG or PNG.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-lg">Personal Information</CardTitle>
                            <CardDescription>Enter the user's basic details and contact info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <Input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Samuel"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <Input
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Boateng"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">E-mail Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="samuel@example.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        placeholder="+233 XX XXX XXXX"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-lg">Security & Access</CardTitle>
                            <CardDescription>Set account permissions and credentials.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">User Role</label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, role: val }))}
                                >
                                    <SelectTrigger className="w-full">
                                        <div className="flex items-center">
                                            <Shield className="w-4 h-4 mr-2 text-primary" />
                                            <SelectValue placeholder="Select a role" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role} value={role}>{role}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        {isEdit ? 'New Password (Optional)' : 'Password'}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <Input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required={!isEdit}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="relative">
                                        <Check className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <Input
                                            name="password_confirmation"
                                            type="password"
                                            value={formData.password_confirmation}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required={!isEdit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="bg-red-100 p-1.5 rounded-full"><X className="w-4 h-4" /></div>
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="bg-emerald-100 p-1.5 rounded-full"><Check className="w-4 h-4" /></div>
                            <p className="text-sm font-medium">User profile {isEdit ? 'updated' : 'created'} successfully! Redirecting...</p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="px-8 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isEdit ? 'Save Changes' : 'Create User'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
