<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$deleted = DB::table('institutions')->where('id', '>=', 14)->delete();
echo "Deleted $deleted seeded institutions.\n";

$remaining = DB::table('institutions')->count();
echo "Remaining institutions: $remaining\n";

$regions = DB::table('institutions')->distinct()->pluck('region');
echo "Regions present: " . json_encode($regions) . "\n";
