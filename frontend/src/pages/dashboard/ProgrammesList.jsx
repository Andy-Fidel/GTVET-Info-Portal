import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { programsAPI } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Plus, Eye, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';

const ProgrammesList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [programmes, setProgrammes] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0
    });

    useEffect(() => {
        fetchProgrammes(1);
    }, []);

    const fetchProgrammes = async (page = 1) => {
        setLoading(true);
        try {
            const response = await programsAPI.getAll({ page });
            setProgrammes(response.data.data || []);
            setPagination(response.data.pagination || {
                current_page: 1,
                last_page: 1,
                total: 0
            });
        } catch (error) {
            console.error("Failed to fetch programmes", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            fetchProgrammes(newPage);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Programmes</h1>
                    <p className="text-muted-foreground">Manage all TVET programmes.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/programmes/add')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Programme
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Programmes</CardTitle>
                    <CardDescription>
                        A list of all registered programmes and their details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : programmes.length === 0 ? (
                        <div className="text-center p-8 text-muted-foreground">
                            No programmes found. Create one to get started.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="rounded-md border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                                        <tr>
                                            <th className="p-4">Code</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Career Paths</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {programmes.map((program) => (
                                            <tr key={program.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium">{program.code}</td>
                                                <td className="p-4">{program.title}</td>
                                                <td className="p-4 max-w-xs truncate" title={program.career_paths}>
                                                    {program.career_paths || '-'}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/dashboard/programmes/edit/${program.id}`)}>
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
                                    Total {pagination.total} programmes
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

export default ProgrammesList;
