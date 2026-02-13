import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
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

const AddPublicInstitution = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [availablePrograms, setAvailablePrograms] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        region: '',
        district: '',
        status: '',
        contact: '',
        location: '',
        email: '',
        description: '',
        institution_code: '',
        gender: '',
        type: 'Public'
    });
    const [image, setImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await programsAPI.getAll({ all: 1 });
                // Check structure: usually response.data.data
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

            // Append programs as an array
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
            navigate('/dashboard/institutions/public');
        } catch (error) {
            console.error("Failed to create institution", error);
            alert("Failed to create institution. Please check fields.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Public Institution</h1>
                <p className="text-muted-foreground">Register a new public TVET institution.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Institution Details</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new institution record.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Institution Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Applied Technical Institute" required onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="institution_code">Institution Code</Label>
                                <Input id="institution_code" name="institution_code" placeholder="e.g. 9050200" onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => handleSelectChange('category', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Category A</SelectItem>
                                        <SelectItem value="B">Category B</SelectItem>
                                        <SelectItem value="C">Category C</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                <Label htmlFor="district">District</Label>
                                <Input id="district" name="district" placeholder="District Name" required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={(value) => handleSelectChange('status', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Day">Day</SelectItem>
                                        <SelectItem value="Boarding">Boarding</SelectItem>
                                        <SelectItem value="Day/Boarding">Day/Boarding</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mixed">Mixed</SelectItem>
                                        <SelectItem value="Boys">Boys</SelectItem>
                                        <SelectItem value="Girls">Girls</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact">Contact Number</Label>
                                <Input id="contact" name="contact" placeholder="Phone Number" onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" name="email" type="email" placeholder="Email Address" required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="Physical Address / Location" required onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="Brief description of the institution..." className="min-h-[100px]" onChange={handleInputChange} />
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
                                Create Institution
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddPublicInstitution;
