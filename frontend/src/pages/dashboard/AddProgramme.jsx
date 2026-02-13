import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { programsAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AddProgramme = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        career_paths: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await programsAPI.create(formData);
            navigate('/dashboard/programmes'); // Redirect to list
        } catch (error) {
            console.error("Failed to create programme", error);
            alert("Failed to create programme. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Programme</h1>
                <p className="text-muted-foreground">Register a new TVET programme.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Programme Details</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new programme record.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Programme Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Computer Science" required onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="code">Programme Code</Label>
                                <Input id="code" name="code" placeholder="e.g. CS-101" required onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="Brief description of the programme..." className="min-h-[100px]" onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="career_paths">Career Paths (Separate by commas)</Label>
                            <Textarea id="career_paths" name="career_paths" placeholder="e.g. Web Developer, System Administrator, IT Consultant..." className="min-h-[100px]" onChange={handleInputChange} />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Programme
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProgramme;
