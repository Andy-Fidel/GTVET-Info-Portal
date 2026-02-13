import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usersAPI } from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import {
    Loader,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Mail,
    Phone,
    Shield,
    ExternalLink,
    UserPlus
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/DropdownMenu'

export default function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await usersAPI.getAll()
            setUsers(response.data.data)
            setError(null)
        } catch (err) {
            setError('Failed to load users')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return

        try {
            await usersAPI.delete(id)
            setUsers(users.filter(user => user.id !== id))
        } catch (err) {
            alert('Failed to delete user')
        }
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getRoleBadgeVariant = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin': return 'destructive'
            case 'editor': return 'primary'
            case 'manager': return 'secondary'
            default: return 'outline'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage administrative access and portal personnel</p>
                </div>
                <Button onClick={() => navigate('/dashboard/users/add')} className="bg-primary hover:bg-primary/90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-white">
                <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between gap-4">
                        <CardTitle className="text-lg">All Administrators</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or role..."
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
                            <p className="text-gray-500 italic">Syncing administrative directory...</p>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center text-red-500 px-4">
                            <p className="font-medium">{error}</p>
                            <Button variant="link" onClick={fetchUsers} className="mt-2">Try Again</Button>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="py-20 text-center border-b border-dashed mb-4 mx-4 rounded-xl bg-gray-50/50 mt-4">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm mb-4">
                                <Search className="w-6 h-6 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">No users found matching "{searchTerm}"</p>
                            <Button variant="ghost" className="mt-2 text-primary" onClick={() => setSearchTerm('')}>Clear Search</Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Joined At</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                                        <AvatarImage src={user.profile_picture_url} />
                                                        <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs font-bold">
                                                            {user.first_name?.[0]}{user.last_name?.[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                                            {user.first_name} {user.last_name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                            <Mail size={12} /> {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={getRoleBadgeVariant(user.role)} className="px-2 py-0 text-[10px] uppercase font-bold tracking-tight">
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.contact ? (
                                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                                        <Phone size={14} className="text-gray-400" />
                                                        {user.contact}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-300 italic text-sm">Not provided</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-primary"
                                                        onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                                                        onClick={() => handleDelete(user.id)}
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
