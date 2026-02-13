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
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EditPrivateInstitution = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
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
    const [previews, setPreviews] = useState({
        cover: null,
        gallery: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [instRes, progRes] = await Promise.all([
                    institutionsAPI.getById(id),
                    programsAPI.getAll({ all: 1 })
                ]);

                const inst = instRes.data.data;
                setFormData({
                    name: inst.name || '',
                    region: inst.region || '',
                    postal_address: inst.postal_address || '',
                    structure_of_training: inst.structure_of_training || '',
                    contact: inst.phone || '', // Map phone back to contact
                    location: inst.location || '',
                    email: inst.email || '',
                    type: inst.type || 'Private'
                });

                if (inst.programs) {
                    setSelectedPrograms(inst.programs.map(p => p.id));
                }

                setPreviews({
                    cover: inst.image_url,
                    gallery: inst.gallery_urls || []
                });

                setAvailablePrograms(progRes.data.data || []);
            } catch (error) {
                console.error("Failed to fetch data", error);
                alert("Failed to load institution details.");
                navigate('/dashboard/institutions/private');
            } finally {
                setFetching(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviews(prev => ({ ...prev, cover: URL.createObjectURL(file) }));
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setGalleryImages(files);
            setPreviews(prev => ({
                ...prev,
                gallery: files.map(file => URL.createObjectURL(file))
            }));
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

            await institutionsAPI.update(id, data);
            navigate('/dashboard/institutions/private');
        } catch (error) {
            console.error("Failed to update institution", error);
            alert("Failed to update institution. Please check fields.");
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
                <h1 className="text-3xl font-bold tracking-tight">Edit Private Institution</h1>
                <p className="text-muted-foreground">Update details for {formData.name}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Private Institution Details</CardTitle>
                    <CardDescription>
                        Update the recorded information for this private institution.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Institution Name</Label>
                                <Input id="name" name="name" value={formData.name} required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <Select onValueChange={(value) => handleSelectChange('region', value)} value={formData.region}>
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
                                <Input id="postal_address" name="postal_address" value={formData.postal_address} required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="structure_of_training">Structure of Training</Label>
                                <Select onValueChange={(value) => handleSelectChange('structure_of_training', value)} value={formData.structure_of_training}>
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
                                <Input id="contact" name="contact" value={formData.contact} required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={formData.location} required onChange={handleInputChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" name="email" type="email" value={formData.email} required onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Programmes Offered</Label>
                            <div className="rounded-md border p-4 max-h-[300px] overflow-y-auto space-y-2 bg-white dark:bg-zinc-950">
                                {availablePrograms.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No programmes found.</p>
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
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                                {previews.cover && (
                                    <div className="mt-2 h-24 w-24 rounded border overflow-hidden">
                                        <img src={previews.cover} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gallery">Gallery Images</Label>
                                <Input id="gallery" type="file" accept="image/*" multiple onChange={handleGalleryChange} className="cursor-pointer" />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {(previews.gallery || []).map((url, i) => (
                                        <div key={i} className="h-12 w-12 rounded border overflow-hidden">
                                            <img src={url} alt={`Gallery ${i}`} className="h-full w-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => navigate('/dashboard/institutions/private')}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditPrivateInstitution;
