<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Institution;
use App\Models\Program;
use Illuminate\Support\Facades\DB;

$institutions = Institution::all();
$count = 0;

foreach ($institutions as $inst) {
    if (!$inst->programmes) continue;
    
    // Programmes is a comma-separated string
    $programmeNames = array_map('trim', explode(',', $inst->programmes));
    
    $ids = [];
    foreach ($programmeNames as $name) {
        // Find program by title (case-insensitive)
        $prog = Program::where('title', 'like', $name)->first();
        if ($prog) {
            $ids[] = $prog->id;
        }
    }
    
    if (!empty($ids)) {
        $inst->programs()->syncWithoutDetaching($ids);
        $count += count($ids);
    }
}

echo "Associated $count programs with institutions.\n";
