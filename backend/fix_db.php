<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Activate all institutions
$affected = DB::table('institutions')->update(['is_active' => true]);
echo "Activated " . $affected . " institutions.\n";

// List all institutions with their regions
$institutions = DB::table('institutions')->select('name', 'region')->get();
echo "Current Institutions and their Regions:\n";
foreach ($institutions as $inst) {
    echo "- " . $inst->name . " [" . ($inst->region ?? 'No Region') . "]\n";
}
