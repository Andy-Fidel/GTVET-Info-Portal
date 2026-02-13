<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$files = array_diff(scandir(database_path('migrations')), ['.', '..']);
foreach($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) !== 'php') continue;
    $name = pathinfo($file, PATHINFO_FILENAME);
    $ran = DB::table('migrations')->where('migration', $name)->exists();
    echo ($ran ? '[X] ' : '[ ] ') . $file . "\n";
}
