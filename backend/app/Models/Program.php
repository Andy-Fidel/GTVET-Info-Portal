<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'institution_id',
        'title',
        'code',
        'description',
        'career_paths',
        'category',
        'duration',
        'level',
        'intake_capacity',
        'entry_requirements',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
}
