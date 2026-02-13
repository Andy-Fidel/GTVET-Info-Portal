import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { announcementsAPI } from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import {
    Loader,
    ChevronLeft,
    Save,
    AlertCircle,
    Image as ImageIcon,
    Link as LinkIcon,
    Type,
    Tag,
    Calendar,
    Megaphone
} from 'lucide-react'

export default function AnnouncementForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEdit)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        published_at: new Date().toISOString().split('T')[0],
        is_active: true,
        image_url: '',
        link: ''
    })

    useEffect(() => {
        if (isEdit) {
            fetchAnnouncement()
        }
    }, [id])

    const fetchAnnouncement = async () => {
        try {
            setFetching(true)
            const response = await announcementsAPI.getById(id)
            const data = response.data.data
            setFormData({
                title: data.title || '',
                content: data.content || '',
                category: data.category || 'General',
                published_at: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : '',
                is_active: data.is_active ?? true,
                image_url: data.image_url || '',
                link: data.link || ''
            })
        } catch (err) {
            setError('Failed to load announcement details')
            console.error(err)
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)

            if (isEdit) {
                await announcementsAPI.update(id, formData)
            } else {
                await announcementsAPI.create(formData)
            }

            navigate('/dashboard/announcements')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save announcement')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-gray-500 font-medium">Loading post details...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/dashboard/announcements')}
                    className="rounded-full bg-white shadow-sm border border-gray-100"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Edit Post' : 'Create New Post'}
                    </h1>
                    <p className="text-gray-500">
                        {isEdit ? 'Update your announcement details' : 'Publish a new update to the portal'}
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                        <CardHeader className="bg-gray-50/50 border-b pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Type className="w-4 h-4 text-primary" /> Content Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Enter a compelling title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Content</label>
                                <textarea
                                    required
                                    rows={10}
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Write your announcement content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                        <CardHeader className="bg-gray-50/50 border-b pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-primary" /> Media & Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> Image URL
                                </label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <LinkIcon className="w-3 h-3" /> External Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://example.com/more-info"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                        <CardHeader className="bg-gray-50/50 border-b pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" /> Metadata
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="General">General</option>
                                    <option value="News">News</option>
                                    <option value="Event">Event</option>
                                    <option value="Scholarship">Scholarship</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Publication Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.published_at}
                                    onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    disabled={true} // Forcing active for now as per simple req
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-not-allowed"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                    Visibility: <span className="text-green-600 font-bold uppercase text-xs">Public</span>
                                </label>
                            </div>

                            <hr className="border-gray-100" />

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-bold text-lg"
                            >
                                {loading ? (
                                    <Loader className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                {isEdit ? 'Update Post' : 'Publish Post'}
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                        <h4 className="flex items-center gap-2 text-blue-900 font-bold mb-2 text-sm">
                            <Megaphone className="w-4 h-4" /> Pro Tip
                        </h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Use engaging titles and high-quality images to increase the visibility of your announcements. Published posts appear immediately on the public news page.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
