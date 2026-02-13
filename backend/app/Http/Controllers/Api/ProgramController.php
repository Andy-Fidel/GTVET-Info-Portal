<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::query()->where('is_active', true);

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('institution_id')) {
            $query->whereHas('institutions', function($q) use ($request) {
                $q->where('institutions.id', $request->input('institution_id'));
            });
        }

        if ($request->has('level')) {
            $query->where('level', $request->input('level'));
        }

        if ($request->input('all')) {
            $programs = $query->with('institutions')->withCount('institutions')->get();
            return response()->json([
                'success' => true,
                'data' => ProgramResource::collection($programs)
            ]);
        }

        $programs = $query->with('institutions')->withCount('institutions')->paginate($request->input('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => ProgramResource::collection($programs),
            'pagination' => [
                'total' => $programs->total(),
                'per_page' => $programs->perPage(),
                'current_page' => $programs->currentPage(),
                'last_page' => $programs->lastPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $program = Program::where('is_active', true)
                          ->with('institutions')
                          ->withCount('institutions')
                          ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program)
        ]);
    }

    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Program Store Request Data:', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'description' => 'nullable|string',
            'career_paths' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['title'] = $request->input('name'); // Map name to title
        // institution_id is nullable in DB? Assuming yes or handled. If strict, I might need to default or handle. 
        // For now I won't set it if not passed.

        $program = Program::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Programme created successfully',
            'data' => new ProgramResource($program)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'description' => 'nullable|string',
            'career_paths' => 'nullable|string',
        ]);

        $data = $request->all();
        if ($request->has('name')) {
            $data['title'] = $request->input('name');
        }

        $program->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Programme updated successfully',
            'data' => new ProgramResource($program)
        ]);
    }
}
