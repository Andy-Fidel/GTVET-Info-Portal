<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$regions = DB::table('institutions')->distinct()->pluck('region');
echo "Distinct Regions in DB: " . json_encode($regions) . "\n";

$count = DB::table('institutions')->count();
echo "Total Institutions: " . $count . "\n";

$activeCount = DB::table('institutions')->where('is_active', true)->count();
echo "Active Institutions: " . $activeCount . "\n";
