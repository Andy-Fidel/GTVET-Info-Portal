<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'category' => $this->category,
            'published_at' => $this->published_at,
            'image_url' => $this->image_url,
            'link' => $this->link,
            'created_at' => $this->created_at,
        ];
    }
}
