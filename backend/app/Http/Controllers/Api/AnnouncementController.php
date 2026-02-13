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
        $announcement = Announcement::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new AnnouncementResource($announcement)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'is_active' => 'boolean',
            'image_url' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
        ]);

        if (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $announcement = Announcement::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Announcement created successfully',
            'data' => new AnnouncementResource($announcement)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $announcement = Announcement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'category' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'is_active' => 'boolean',
            'image_url' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
        ]);

        $announcement->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Announcement updated successfully',
            'data' => new AnnouncementResource($announcement)
        ]);
    }

    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Announcement deleted successfully'
        ]);
    }
}
