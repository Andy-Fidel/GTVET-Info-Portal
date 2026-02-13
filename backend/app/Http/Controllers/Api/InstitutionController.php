<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\InstitutionResource;
use App\Models\Institution;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    public function index(Request $request)
    {
        $query = Institution::query()->where('is_active', true);

        $query->when($request->filled('search'), function($q) use ($request) {
            $search = $request->input('search');
            $q->where(function($inner) use ($search) {
                $inner->where('name', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%")
                      ->orWhere('region', 'like', "%{$search}%");
            });
        });

        $query->when($request->filled('region'), function($q) use ($request) {
            $q->where('region', $request->input('region'));
        });

        $query->when($request->filled('type'), function($q) use ($request) {
            $q->where('type', $request->input('type'));
        });

        $query->when($request->filled('program_id'), function($q) use ($request) {
            $q->whereHas('programs', function($inner) use ($request) {
                $inner->where('programs.id', $request->input('program_id'));
            });
        });

        $perPage = $request->input('per_page', 12);
        $institutions = $query->with('programs')->withCount('programs')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => InstitutionResource::collection($institutions),
            'pagination' => [
                'total' => $institutions->total(),
                'per_page' => $institutions->perPage(),
                'current_page' => $institutions->currentPage(),
                'last_page' => $institutions->lastPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $institution = Institution::where('is_active', true)
                                   ->with(['programs'])
                                   ->withCount('programs')
                                   ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new InstitutionResource($institution)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string', // A, B, C (Public only)
            'region' => 'required|string',
            'district' => 'nullable|string', // Public only
            'status' => 'nullable|string', // Day, Boarding (Public only)
            'contact' => 'nullable|string',
            'location' => 'required|string',
            'email' => 'required|email',
            'description' => 'nullable|string',
            'programmes' => 'nullable|string',
            'institution_code' => 'nullable|string',
            'gender' => 'nullable|string', // Public only
            'postal_address' => 'nullable|string', // Private only
            'structure_of_training' => 'nullable|string', // Private only
            'image' => 'nullable|image|max:2048', // Main image
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048', // Gallery images
            'type' => 'nullable|string',
            'program_ids' => 'nullable|array',
            'program_ids.*' => 'exists:programs,id'
        ]);

        $data = $request->except(['image', 'images', 'program_ids']);
        $data['type'] = $data['type'] ?? 'Public'; // Default to Public
        $data['phone'] = $request->input('contact'); // Map contact to phone
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('institutions', 'public');
            $data['image_path'] = $path;
        }

        if ($request->hasFile('images')) {
            $gallery = [];
            foreach ($request->file('images') as $file) {
                $path = $file->store('institutions/gallery', 'public');
                $gallery[] = $path;
            }
            $data['gallery'] = $gallery;
        }

        $institution = Institution::create($data);

        if ($request->has('program_ids')) {
            $institution->programs()->sync($request->input('program_ids'));
        }

        return response()->json([
            'success' => true,
            'message' => 'Institution created successfully',
            'data' => new InstitutionResource($institution)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string',
            'region' => 'required|string',
            'district' => 'nullable|string',
            'status' => 'nullable|string',
            'contact' => 'nullable|string',
            'location' => 'required|string',
            'email' => 'required|email',
            'description' => 'nullable|string',
            'programmes' => 'nullable|string',
            'institution_code' => 'nullable|string',
            'gender' => 'nullable|string',
            'postal_address' => 'nullable|string',
            'structure_of_training' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
            'type' => 'nullable|string',
            'program_ids' => 'nullable|array',
            'program_ids.*' => 'exists:programs,id'
        ]);

        $data = $request->except(['image', 'images', 'program_ids']);
        $data['phone'] = $request->input('contact');

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($institution->image_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($institution->image_path);
            }
            $path = $request->file('image')->store('institutions', 'public');
            $data['image_path'] = $path;
        }

        if ($request->hasFile('images')) {
            // Options: additive or replacement. User said "upload one or more images".
            // I'll assume replacement for simplicity in this step unless additive is needed.
            // Let's do additive for gallery maybe? Or just replace. 
            // For now, let's keep it simple: replace all gallery images if new ones are uploaded.
            if ($institution->gallery) {
                foreach ($institution->gallery as $oldPath) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
                }
            }
            $gallery = [];
            foreach ($request->file('images') as $file) {
                $path = $file->store('institutions/gallery', 'public');
                $gallery[] = $path;
            }
            $data['gallery'] = $gallery;
        }

        $institution->update($data);

        if ($request->has('program_ids')) {
            $institution->programs()->sync($request->input('program_ids'));
        }

        return response()->json([
            'success' => true,
            'message' => 'Institution updated successfully',
            'data' => new InstitutionResource($institution)
        ]);
    }
}
