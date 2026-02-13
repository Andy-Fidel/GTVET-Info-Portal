<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$institutions = DB::table('institutions')->get();
echo "Total Institutions: " . $institutions->count() . "\n";

$regionCounts = [];
foreach ($institutions as $inst) {
    $region = $inst->region;
    $regionKey = $region === null ? 'NULL' : '"' . $region . '"';
    if (!isset($regionCounts[$regionKey])) {
        $regionCounts[$regionKey] = 0;
    }
    $regionCounts[$regionKey]++;
}

echo "Region Breakdown (Exact Strings):\n";
foreach ($regionCounts as $region => $count) {
    echo "- $region: $count\n";
}

// Check an example for Ahafo
$ahafo = DB::table('institutions')->where('region', 'LIKE', '%Ahafo%')->get();
echo "\nRecords matching LIKE '%Ahafo%': " . $ahafo->count() . "\n";
foreach ($ahafo as $inst) {
    echo "ID: " . $inst->id . " | Name: " . $inst->name . " | Region: [" . $inst->region . "]\n";
}
