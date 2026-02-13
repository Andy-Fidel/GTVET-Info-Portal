<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'institution_code',
        'category',
        'description',
        'location',
        'region',
        'district',
        'status', // Day, Boarding
        'gender', // Mixed, Boys, Girls
        'email',
        'phone',
        'postal_address',
        'structure_of_training',
        'website',
        'established_year',
        'programmes', // Text summary of programmes
        'image_path',
        'gallery',
        'type', // Public/Private - keeping this for the general type
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'gallery' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function programs()
    {
        return $this->belongsToMany(Program::class);
    }
}
