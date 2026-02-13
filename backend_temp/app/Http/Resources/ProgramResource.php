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
            'institution_id' => $this->institution_id,
            'institution' => new InstitutionResource($this->whenLoaded('institution')),
            'title' => $this->title,
            'code' => $this->code,
            'description' => $this->description,
            'category' => $this->category,
            'duration' => $this->duration,
            'level' => $this->level,
            'intake_capacity' => $this->intake_capacity,
            'entry_requirements' => $this->entry_requirements,
            'created_at' => $this->created_at,
        ];
    }
}
