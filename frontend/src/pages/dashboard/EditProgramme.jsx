import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { programsAPI } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EditProgramme = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        career_paths: ''
    });

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await programsAPI.getById(id);
                const program = response.data.data;
                setFormData({
                    name: program.title || '',
                    code: program.code || '',
                    description: program.description || '',
                    career_paths: program.career_paths || ''
                });
            } catch (error) {
                console.error("Failed to fetch programme", error);
                alert("Failed to load programme data.");
                navigate('/dashboard/programmes');
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchProgram();
        }
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await programsAPI.update(id, formData);
            navigate('/dashboard/programmes');
        } catch (error) {
            console.error("Failed to update programme", error);
            alert("Failed to update programme. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Programme</h1>
                <p className="text-muted-foreground">Update programme details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Programme Details</CardTitle>
                    <CardDescription>
                        Update the details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Programme Name</Label>
                                <Input id="name" name="name" value={formData.name} placeholder="e.g. Computer Science" required onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="code">Programme Code</Label>
                                <Input id="code" name="code" value={formData.code} placeholder="e.g. CS-101" required onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} placeholder="Brief description of the programme..." className="min-h-[100px]" onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="career_paths">Career Paths (Separate by commas)</Label>
                            <Textarea id="career_paths" name="career_paths" value={formData.career_paths} placeholder="e.g. Web Developer, System Administrator, IT Consultant..." className="min-h-[100px]" onChange={handleInputChange} />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => navigate('/dashboard/programmes')}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Programme
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProgramme;
