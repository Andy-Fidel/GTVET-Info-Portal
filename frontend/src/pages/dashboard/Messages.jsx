import { useState, useEffect } from 'react'
import { contactAPI } from '../../services/api'
import { useAppStore } from '../../store/appStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import {
    Mail,
    Search,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    MoreVertical,
    Filter,
    Inbox,
    AlertCircle,
    Loader
} from 'lucide-react'
// Removed date-fns import to use native Intl.DateTimeFormat for better compatibility

export default function Messages() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all') // all, read, unread
    const [selectedMessage, setSelectedMessage] = useState(null)
    const { unreadMessagesCount, setUnreadMessagesCount } = useAppStore()

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const response = await contactAPI.getMessages()
            setMessages(response.data.data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch messages. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await contactAPI.updateMessageStatus(id, !currentStatus)
            setMessages(messages.map(m =>
                m.id === id ? { ...m, is_read: !currentStatus } : m
            ))
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, is_read: !currentStatus })
            }
            // Update global count
            setUnreadMessagesCount(Math.max(0, !currentStatus ? unreadMessagesCount - 1 : unreadMessagesCount + 1))
        } catch (err) {
            console.error('Failed to update status', err)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return
        try {
            await contactAPI.deleteMessage(id)
            setMessages(messages.filter(m => m.id !== id))
            if (selectedMessage?.id === id) setSelectedMessage(null)
            // Update global count if we deleted an unread message
            const deletedMessage = messages.find(m => m.id === id)
            if (deletedMessage && !deletedMessage.is_read) {
                setUnreadMessagesCount(Math.max(0, unreadMessagesCount - 1))
            }
        } catch (err) {
            console.error('Failed to delete message', err)
        }
    }

    const filteredMessages = messages.filter(m => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email.toLowerCase().includes(searchTerm.toLowerCase())

        if (filter === 'read') return matchesSearch && m.is_read
        if (filter === 'unread') return matchesSearch && !m.is_read
        return matchesSearch
    })

    const unreadCount = messages.filter(m => !m.is_read).length

    if (loading && messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-slate-500 font-medium tracking-tight">Syncing with GTVET messages...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        Inquiries
                        {unreadCount > 0 && (
                            <Badge className="bg-primary hover:bg-primary text-white border-none rounded-full px-2.5 py-0.5">
                                {unreadCount} New
                            </Badge>
                        )}
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage incoming communication from the GTVET Information Portal.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Messages List Sidebar */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                    <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white">
                        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Seach inquiries..."
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {['all', 'unread'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50 max-h-[calc(100vh-320px)] overflow-auto scrollbar-thin">
                            {filteredMessages.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 mb-3">
                                        <Inbox className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium tracking-tight">No messages found</p>
                                </div>
                            ) : (
                                filteredMessages.map((m) => (
                                    <div
                                        key={m.id}
                                        onClick={() => setSelectedMessage(m)}
                                        className={`p-4 cursor-pointer transition-all hover:bg-slate-50 group border-l-4 ${selectedMessage?.id === m.id
                                            ? 'bg-slate-50 border-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                                            : m.is_read ? 'border-transparent' : 'border-primary/40 bg-primary/[0.02]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className={`text-sm tracking-tight ${!m.is_read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                                                {m.name}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400">
                                                {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(m.created_at))}
                                            </span>
                                        </div>
                                        <p className={`text-xs mb-1 truncate ${!m.is_read ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                                            {m.subject}
                                        </p>
                                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                                            <Mail className="w-3 h-3" />
                                            {m.email}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                {/* Message Content View */}
                <div className="lg:col-span-7 xl:col-span-8">
                    {selectedMessage ? (
                        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white ring-1 ring-slate-200 h-full overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h2 className="text-xl font-bold text-slate-900 truncate tracking-tight">{selectedMessage.subject}</h2>
                                                <Badge variant={selectedMessage.is_read ? "secondary" : "default"} className="bg-slate-100 text-slate-600 border-none font-bold uppercase text-[10px] tracking-widest px-2 py-0.5">
                                                    {selectedMessage.is_read ? 'Opened' : 'New'}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                                                <span className="text-slate-900 font-bold">{selectedMessage.name}</span>
                                                <span className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                                                    <Mail className="w-3.5 h-3.5" /> {selectedMessage.email}
                                                </span>
                                                {selectedMessage.phone && (
                                                    <span className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                                                        <span className="w-3.5 h-3.5 flex items-center justify-center">✆</span> {selectedMessage.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl hover:bg-slate-100 text-slate-400 hover:text-primary transition-all"
                                            onClick={() => handleToggleStatus(selectedMessage.id, selectedMessage.is_read)}
                                            title={selectedMessage.is_read ? "Mark as unread" : "Mark as read"}
                                        >
                                            {selectedMessage.is_read ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            title="Delete inquiry"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 p-8 md:p-10 overflow-auto bg-white">
                                <div className="max-w-3xl mx-auto">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry Details</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(selectedMessage.created_at))}
                                        </p>
                                    </div>
                                    <div className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap selection:bg-primary/10">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8 h-12 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                    onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                >
                                    Draft Reply
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/30 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl shadow-slate-200/50 mb-8 ring-1 ring-slate-100">
                                <Mail className="w-10 h-10 text-slate-300 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Select an Inquiry</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">Choose a message from the list to view the full details and take administrative action.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
