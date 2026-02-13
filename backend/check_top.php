<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$all = DB::table('institutions')->take(15)->get();
foreach ($all as $inst) {
    echo $inst->id . ": " . $inst->name . " | Region: " . $inst->region . "\n";
}
