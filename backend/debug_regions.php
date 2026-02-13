<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$all = DB::table('institutions')->get();
echo "Total: " . $all->count() . "\n";
foreach ($all as $i) {
    echo "ID: {$i->id} | Region: " . var_export($i->region, true) . " | Name: {$i->name}\n";
}

$ahafoExact = DB::table('institutions')->where('region', 'Ahafo')->count();
echo "Count for exact 'Ahafo': $ahafoExact\n";

$ashantiExact = DB::table('institutions')->where('region', 'Ashanti')->count();
echo "Count for exact 'Ashanti': $ashantiExact\n";
