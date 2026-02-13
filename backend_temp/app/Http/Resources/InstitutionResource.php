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
            'description' => $this->description,
            'location' => $this->location,
            'region' => $this->region,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'established_year' => $this->established_year,
            'programs_count' => $this->programs()->count(),
            'created_at' => $this->created_at,
        ];
    }
}
