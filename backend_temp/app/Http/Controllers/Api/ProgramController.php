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
            $query->where('institution_id', $request->input('institution_id'));
        }

        if ($request->has('level')) {
            $query->where('level', $request->input('level'));
        }

        $programs = $query->with('institution')->paginate(20);

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
                          ->with('institution')
                          ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program)
        ]);
    }
}
