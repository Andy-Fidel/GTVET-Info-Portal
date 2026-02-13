<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$all = DB::table('institutions')->get();
echo "Total Institutions: " . $all->count() . "\n";

foreach ($all as $inst) {
    echo "ID: " . $inst->id . " | Name: " . $inst->name . " | Region: " . ($inst->region ?? 'NULL') . " | Created: " . $inst->created_at . "\n";
}
