<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$path = 'institutions/9Ys1bKNjKxhm0l7dFB7.jpg';
$fullPath = storage_path('app/public/' . $path);

echo "Checking path: $fullPath\n";
echo "Exists: " . (File::exists($fullPath) ? "YES" : "NO") . "\n";

$altPath = str_replace('/', DIRECTORY_SEPARATOR, $fullPath);
echo "Checking alt path: $altPath\n";
echo "Exists: " . (File::exists($altPath) ? "YES" : "NO") . "\n";
