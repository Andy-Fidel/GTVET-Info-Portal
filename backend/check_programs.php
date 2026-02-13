<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Program;

$total = Program::count();
$active = Program::where('is_active', true)->count();
$first = Program::first();

echo "Total programs: $total\n";
echo "Active programs: $active\n";
if ($first) {
    echo "First program title: " . $first->title . "\n";
    echo "First program name (if exists): " . ($first->name ?? 'N/A') . "\n";
}
