<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$all = DB::table('institutions')->get();
echo "Total Institutions: " . $all->count() . "\n";

foreach ($all as $inst) {
    echo "- " . $inst->name . " | Region: " . ($inst->region ?? 'NULL') . " | is_active raw: " . var_export($inst->is_active, true) . "\n";
}

// Try filtering specifically for integer 1
$activeByOne = DB::table('institutions')->where('is_active', 1)->count();
echo "Active (filtered by 1): " . $activeByOne . "\n";

$activeByTrue = DB::table('institutions')->where('is_active', true)->count();
echo "Active (filtered by true): " . $activeByTrue . "\n";
