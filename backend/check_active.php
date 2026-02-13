<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$all = DB::table('institutions')->get();
foreach ($all as $i) {
    echo "ID: {$i->id} | Name: {$i->name} | is_active: " . ($i->is_active ? 'TRUE' : 'FALSE') . "\n";
}
