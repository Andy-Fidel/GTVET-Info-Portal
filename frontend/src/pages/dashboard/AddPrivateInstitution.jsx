import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/Select';
import { institutionsAPI, programsAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AddPrivateInstitution = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [availablePrograms, setAvailablePrograms] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        region: '',
        postal_address: '',
        structure_of_training: '',
        contact: '',
        location: '',
        email: '',
        type: 'Private'
    });
    const [image, setImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await programsAPI.getAll({ all: 1 });
                setAvailablePrograms(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }
        };
        fetchPrograms();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files) {
            setGalleryImages(Array.from(e.target.files));
        }
    };

    const handleProgramToggle = (id) => {
        setSelectedPrograms(prev => {
            if (prev.includes(id)) {
                return prev.filter(p => p !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            if (selectedPrograms.length > 0) {
                selectedPrograms.forEach((id) => {
                    data.append('program_ids[]', id);
                });
            }

            if (image) {
                data.append('image', image);
            }

            if (galleryImages.length > 0) {
                galleryImages.forEach((img, index) => {
                    data.append(`images[${index}]`, img);
                });
            }

            await institutionsAPI.create(data);
            navigate('/dashboard/institutions/private');
        } catch (error) {
            console.error("Failed to create institution", error);
            alert("Failed to create institution. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Private Institution</h1>
                <p className="text-muted-foreground">Register a new private TVET institution.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Private Institution Details</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new private institution record.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Institution Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Accra Technical Institute" required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <Select onValueChange={(value) => handleSelectChange('region', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Greater Accra', 'Ashanti', 'Eastern', 'Western', 'Central', 'Northern', 'Volta', 'Oti', 'Western-North', 'Savannah', 'North-East', 'Bono', 'Bono-East', 'Ahafo', 'Upper East', 'Upper West'].map(region => (
                                            <SelectItem key={region} value={region}>{region}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postal_address">Postal Address</Label>
                                <Input id="postal_address" name="postal_address" placeholder="P.O. Box ..." required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="structure_of_training">Structure of Training</Label>
                                <Select onValueChange={(value) => handleSelectChange('structure_of_training', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Structure" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Formal">Formal</SelectItem>
                                        <SelectItem value="Informal">Informal</SelectItem>
                                        <SelectItem value="Apprenticeship">Apprenticeship</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact">Contact Information</Label>
                                <Input id="contact" name="contact" placeholder="Phone Number" required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="Physical Address / Location" required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" name="email" type="email" placeholder="Email Address" required onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Programmes Offered</Label>
                            <div className="rounded-md border p-4 max-h-[300px] overflow-y-auto space-y-2 bg-white dark:bg-zinc-950">
                                {availablePrograms.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No programmes found. Create programmes first.</p>
                                ) : (
                                    availablePrograms.map(program => (
                                        <div key={program.id} className="flex items-start space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`prog-${program.id}`}
                                                checked={selectedPrograms.includes(program.id)}
                                                onChange={() => handleProgramToggle(program.id)}
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <Label htmlFor={`prog-${program.id}`} className="font-normal cursor-pointer leading-snug">
                                                <span className="font-medium">{program.title}</span>
                                                {program.code && <span className="ml-1 text-muted-foreground text-xs">({program.code})</span>}
                                            </Label>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">Select multiple programmes from the list.</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gallery">Gallery Images</Label>
                                <Input id="gallery" type="file" accept="image/*" multiple onChange={handleGalleryChange} className="cursor-pointer" />
                                <p className="text-xs text-muted-foreground">{galleryImages.length} images selected</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Private Institution
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddPrivateInstitution;
