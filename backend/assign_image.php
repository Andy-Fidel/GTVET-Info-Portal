<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Institution;
use Illuminate\Support\Facades\Storage;

$files = Storage::disk('public')->files('institutions');
$img = collect($files)->first();

if ($img) {
    $inst = Institution::first();
    if ($inst) {
        $inst->image_path = $img;
        $inst->save();
        echo "Assigned $img to institution ID {$inst->id} ({$inst->name})\n";
    } else {
        echo "No institution found.\n";
    }
} else {
    echo "No images found in institutions folder.\n";
}
