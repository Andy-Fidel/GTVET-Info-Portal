<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->title, // Alias for backward compatibility
            'title' => $this->title,
            'institution_id' => $this->institutions->first()?->id, // Helper for backward compatibility
            'institutions' => InstitutionResource::collection($this->whenLoaded('institutions')),
            'code' => $this->code,
            'description' => $this->description,
            'category' => $this->category,
            'career_paths' => $this->career_paths,
            'duration' => $this->duration,
            'level' => $this->level,
            'intake_capacity' => $this->intake_capacity,
            'entry_requirements' => $this->entry_requirements,
            'institutions_count' => $this->institutions_count,
            'created_at' => $this->created_at,
        ];
    }
}
