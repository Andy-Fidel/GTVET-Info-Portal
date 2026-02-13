<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Institution;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

$files = Storage::disk('public')->files('institutions');
$count = 0;

foreach ($files as $oldFile) {
    if (basename($oldFile) === '.gitignore' || basename($oldFile) === 'test_easy.jpg') continue;
    
    $extension = pathinfo($oldFile, PATHINFO_EXTENSION);
    $newName = 'inst_' . Str::random(10) . '.' . $extension;
    $newPath = 'institutions/' . $newName;
    
    if (Storage::disk('public')->move($oldFile, $newPath)) {
        // Update database records that used this old path
        $updatedMain = Institution::where('image_path', $oldFile)->update(['image_path' => $newPath]);
        
        // Update gallery records (JSON array)
        $institutions = Institution::where('gallery', 'like', '%' . $oldFile . '%')->get();
        foreach ($institutions as $inst) {
            $gallery = $inst->gallery;
            foreach ($gallery as $key => $path) {
                if ($path === $oldFile) {
                    $gallery[$key] = $newPath;
                }
            }
            $inst->gallery = $gallery;
            $inst->save();
        }
        
        echo "Renamed $oldFile to $newPath\n";
        $count++;
    }
}

echo "Successfully renamed $count files.\n";
