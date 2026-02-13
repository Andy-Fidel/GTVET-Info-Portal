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

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%");
        }

        if ($request->has('region')) {
            $query->where('region', $request->input('region'));
        }

        $institutions = $query->with('programs')->paginate(15);

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
                                   ->with('programs')
                                   ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new InstitutionResource($institution)
        ]);
    }
}
