<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstitutionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'institution_code' => $this->institution_code,
            'category' => $this->category,
            'description' => $this->description,
            'location' => $this->location,
            'region' => $this->region,
            'district' => $this->district,
            'status' => $this->status,
            'gender' => $this->gender,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'postal_address' => $this->postal_address,
            'structure_of_training' => $this->structure_of_training,
            'established_year' => $this->established_year,
            'programmes' => $this->programmes, // Text summary if needed
            'programs' => ProgramResource::collection($this->whenLoaded('programs')),
            'image_url' => $this->image_path ? url('api/view-image?path=' . $this->image_path) : null,
            'gallery_urls' => collect($this->gallery ?? [])->map(fn($path) => url('api/view-image?path=' . $path)),
            'type' => $this->type,
            'programs_count' => $this->programs_count ?? $this->programs()->count(),
            'created_at' => $this->created_at,
        ];
    }
}
