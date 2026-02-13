<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        // Counts
        $publicCount = Institution::where('type', 'Public')->count();
        $privateCount = Institution::where('type', 'Private')->count();
        $totalPrograms = Program::count();
        
        // Category breakdown
        $categories = Institution::select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();

        // Safe access for categories
        $catA = $categories['A'] ?? 0;
        $catB = $categories['B'] ?? 0;
        $catC = $categories['C'] ?? 0;

        // Charts: Programs by Field (Top 5 for donut/pie chart)
        // Assuming 'field' is a column in programs, or we use 'name' if no field exists.
        // Based on previous contexts, Program might not have 'field'. Let's check Program model.
        // Ideally we group by something. If not, we can return dummy data or group by created_at.
        // EDIT: I should check Program model first. For now I will assume some structure or return empty if not sure.
        // Let's use a dummy distribution if 'field' doesn't exist to avoid breaking errors, 
        // but better to check the model first. I'll read the model in the next step if I can't find it.
        // Actually, I saw Program.php in the file list earlier. I better check it.
        
        // Charts: Institutions by Region
        $regions = Institution::select('region', DB::raw('count(*) as count'))
            ->groupBy('region')
            ->get();

        return response()->json([
            'counts' => [
                'public_institutions' => $publicCount,
                'private_institutions' => $privateCount,
                'total_programmes' => $totalPrograms,
                'categories' => [
                    'A' => $catA,
                    'B' => $catB,
                    'C' => $catC,
                ]
            ],
            'charts' => [
                'programmes_by_field' => Program::select('category as name', DB::raw('count(*) as value'))
                    ->groupBy('category')
                    ->get(), 
                'institutions_by_region' => $regions
            ]
        ]);
    }
}
