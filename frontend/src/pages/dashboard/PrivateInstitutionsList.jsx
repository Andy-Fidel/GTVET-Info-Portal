import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { institutionsAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Eye, Edit, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

const PrivateInstitutionsList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [institutions, setInstitutions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0
    });

    useEffect(() => {
        fetchInstitutions(1);
    }, []);

    const fetchInstitutions = async (page = 1, search = searchTerm) => {
        setLoading(true);
        try {
            const response = await institutionsAPI.getAll({
                page,
                search,
                type: 'Private'
            });
            setInstitutions(response.data.data || []);
            setPagination(response.data.pagination || {
                current_page: 1,
                last_page: 1,
                total: 0
            });
        } catch (error) {
            console.error("Failed to fetch institutions", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchInstitutions(1, searchTerm);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            fetchInstitutions(newPage);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Private Institutions</h1>
                    <p className="text-muted-foreground">Manage all private TVET institutions.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/institutions/add-private')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Private Institution
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Private Institutions</CardTitle>
                            <CardDescription>
                                A list of all registered private institutions and their details.
                            </CardDescription>
                        </div>
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="pl-8 w-[250px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="secondary" size="sm">Search</Button>
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : institutions.length === 0 ? (
                        <div className="text-center p-8 text-muted-foreground">
                            {searchTerm ? "No institutions match your search." : "No private institutions found."}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="rounded-md border overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Location</th>
                                            <th className="p-4">Region</th>
                                            <th className="p-4">Training Structure</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {institutions.map((inst) => (
                                            <tr key={inst.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium">{inst.name}</td>
                                                <td className="p-4">{inst.location || '-'}</td>
                                                <td className="p-4">{inst.region}</td>
                                                <td className="p-4">{inst.structure_of_training || '-'}</td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            title="Edit"
                                                            onClick={() => navigate(`/dashboard/institutions/edit-private/${inst.id}`)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between px-2">
                                <div className="text-sm text-muted-foreground">
                                    Total {pagination.total} institutions
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.current_page - 1)}
                                        disabled={pagination.current_page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" />
                                        Previous
                                    </Button>
                                    <div className="text-sm font-medium">
                                        Page {pagination.current_page} of {pagination.last_page}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.current_page + 1)}
                                        disabled={pagination.current_page === pagination.last_page}
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PrivateInstitutionsList;
