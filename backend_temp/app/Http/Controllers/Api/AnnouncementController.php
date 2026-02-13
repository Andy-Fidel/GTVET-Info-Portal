<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $query = Announcement::query()
                              ->where('is_active', true)
                              ->orderBy('published_at', 'desc');

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        $announcements = $query->paginate(10);

        return response()->json([
            'success' => true,
            'data' => AnnouncementResource::collection($announcements),
            'pagination' => [
                'total' => $announcements->total(),
                'per_page' => $announcements->perPage(),
                'current_page' => $announcements->currentPage(),
                'last_page' => $announcements->lastPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $announcement = Announcement::where('is_active', true)->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new AnnouncementResource($announcement)
        ]);
    }
}
