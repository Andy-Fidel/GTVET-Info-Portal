import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { institutionsAPI } from '../services/api'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import {
    MapPin,
    Globe,
    Mail,
    Phone,
    Calendar,
    BookOpen,
    ChevronLeft,
    Loader,
    ExternalLink,
    Award,
    Users,
    GraduationCap,
    Hash,
    Activity,
    ShieldCheck
} from 'lucide-react'

export default function InstitutionDetails() {
    const { id } = useParams()
    const [institution, setInstitution] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        fetchInstitution()
    }, [id])

    const fetchInstitution = async () => {
        try {
            setLoading(true)
            const response = await institutionsAPI.getById(id)
            const data = response.data.data
            setInstitution(data)
            setActiveImage(data.image_url)
        } catch (err) {
            setError(err.message || 'Failed to load institution details')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-600">Loading details...</p>
                </div>
            </div>
        )
    }

    if (error || !institution) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 mb-6">
                        <p className="text-lg font-semibold mb-2">Oops! Something went wrong</p>
                        <p className="text-gray-600">{error || 'Institution not found'}</p>
                    </div>
                    <Link to="/institutions">
                        <Button variant="outline" className="gap-2">
                            <ChevronLeft size={20} /> Back to Institutions
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {activeImage ? (
                    <img
                        src={activeImage}
                        alt={institution.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-900" />
                )}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                        <Link
                            to="/institutions"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ChevronLeft size={20} className="mr-1" /> Back to Institutions
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <Badge className="mb-4 bg-white/20 text-white backdrop-blur-md border-white/30 hover:bg-white/30">
                                    {institution.category || 'TVET Institution'}
                                </Badge>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                    {institution.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-blue-400" />
                                        <span>{institution.location}, {institution.region}</span>
                                    </div>
                                    {institution.established_year && (
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-blue-400" />
                                            <span>Established {institution.established_year}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {institution.website && (
                                    <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
                                        <a href={institution.website.startsWith('http') ? institution.website : `https://${institution.website}`} target="_blank" rel="noopener noreferrer">
                                            Visit Website <ExternalLink size={16} className="ml-2" />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        {institution.gallery_urls && institution.gallery_urls.length > 0 && (
                            <Card className="border-none shadow-sm overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                        <button
                                            onClick={() => setActiveImage(institution.image_url)}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === institution.image_url ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={institution.image_url} alt="Cover" className="w-full h-full object-cover" />
                                        </button>
                                        {institution.gallery_urls.map((url, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImage(url)}
                                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === url ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            >
                                                <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* About Section */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <BookOpen className="text-primary" /> About the Institution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none text-gray-600 leading-relaxed">
                                    {institution.description || 'No description available for this institution.'}
                                </div>

                                {institution.structure_of_training && (
                                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                        <h4 className="font-bold text-blue-900 mb-2">Structure of Training</h4>
                                        <p className="text-blue-800/80">{institution.structure_of_training}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Programs Section */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <GraduationCap className="text-primary" /> Offered Programs
                                </CardTitle>
                                <Badge variant="secondary" className="px-3 py-1">
                                    {institution.programs ? institution.programs.length : 0} Available
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {institution.programs && institution.programs.length > 0 ? (
                                        institution.programs.map((program) => (
                                            <div
                                                key={program.id}
                                                className="p-4 rounded-xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-md transition-all group"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                        {program.title}
                                                    </h4>
                                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                                                        {program.level || 'Certificate'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                                    {program.description || 'Professional training program focused on career excellence.'}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} /> {program.duration || 'N/A'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users size={14} /> {program.intake_capacity || 'N/A'} capacity
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-gray-500">
                                            <p>No specific programs listed yet.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm h-fit">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {institution.email && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-primary">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Email Address</p>
                                            <a href={`mailto:${institution.email}`} className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                                                {institution.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {institution.phone && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Phone Number</p>
                                            <p className="text-sm text-gray-700 font-medium">{institution.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {institution.location && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                                            <p className="text-sm text-gray-700 font-medium">{institution.location}</p>
                                            <p className="text-xs text-gray-400">{institution.region} Region</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm h-fit">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Institutional Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {institution.institution_code && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                            <Hash size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Institution Code</p>
                                            <p className="text-sm text-gray-700 font-medium">{institution.institution_code}</p>
                                        </div>
                                    </div>
                                )}
                                {institution.category && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Category</p>
                                            <p className="text-sm text-gray-700 font-medium">Category {institution.category}</p>
                                        </div>
                                    </div>
                                )}
                                {institution.status && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                                            <p className="text-sm text-gray-700 font-medium">{institution.status}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm h-fit bg-primary text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white/80">Accredited by</p>
                                        <p className="font-bold">GTVET Service</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed mb-6">
                                    This institution is fully registered and licensed to provide technical and vocational education in accordance with national standards.
                                </p>
                                <Button variant="secondary" className="w-full font-bold">
                                    Download Prospectus
                                </Button>
                            </CardContent>
                        </Card>

                        {institution.postal_address && (
                            <Card className="border-none shadow-sm h-fit">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Postal Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl italic">
                                        {institution.postal_address}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
