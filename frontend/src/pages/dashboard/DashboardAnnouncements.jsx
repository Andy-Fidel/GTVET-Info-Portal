import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { announcementsAPI } from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import {
    Loader,
    Plus,
    Search,
    Edit,
    Trash2,
    Calendar,
    Megaphone,
    Newspaper,
    ExternalLink
} from 'lucide-react'

export default function DashboardAnnouncements() {
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const fetchAnnouncements = async () => {
        try {
            setLoading(true)
            const response = await announcementsAPI.getAll()
            setAnnouncements(response.data.data || response.data)
        } catch (err) {
            console.error('Failed to load announcements', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return

        try {
            await announcementsAPI.delete(id)
            setAnnouncements(announcements.filter(a => a.id !== id))
        } catch (err) {
            alert('Failed to delete announcement')
        }
    }

    const filteredAnnouncements = announcements.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getCategoryVariant = (category) => {
        switch (category?.toLowerCase()) {
            case 'news': return 'primary'
            case 'event': return 'secondary'
            case 'scholarship': return 'destructive'
            default: return 'outline'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                    <p className="text-gray-500 mt-1">Manage portal news, events, and important updates</p>
                </div>
                <Button onClick={() => navigate('/dashboard/announcements/add')} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-white">
                <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between gap-4">
                        <CardTitle className="text-lg">All Posts</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or category..."
                                className="w-full pl-10 pr-4 py-2 text-sm border-none bg-gray-50 rounded-lg focus:ring-1 focus:ring-primary/20 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="py-20 text-center">
                            <Loader className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                            <p className="text-gray-500 italic">Syncing newsroom...</p>
                        </div>
                    ) : filteredAnnouncements.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Newspaper className="w-6 h-6 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">No announcements found</p>
                            <Button variant="ghost" className="mt-2 text-primary" onClick={() => setSearchTerm('')}>Clear Search</Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Article</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredAnnouncements.map((ann) => (
                                        <tr key={ann.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {ann.image_url ? (
                                                        <img src={ann.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <Megaphone size={16} className="text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                            {ann.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                            {ann.link ? <ExternalLink size={10} /> : null}
                                                            {ann.link ? 'Has external link' : 'Internal Content'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={getCategoryVariant(ann.category)} className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-tight">
                                                    {ann.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    {new Date(ann.published_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-primary"
                                                        onClick={() => navigate(`/dashboard/announcements/edit/${ann.id}`)}
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                                                        onClick={() => handleDelete(ann.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
