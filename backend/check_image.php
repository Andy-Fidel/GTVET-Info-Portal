<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = App\Models\User::first();
echo "User ID: " . $user->id . "\n";
echo "Image Path: " . ($user->image_path ?? 'NULL') . "\n";
echo "Profile Picture URL: " . ($user->profile_picture_url ?? 'NULL') . "\n";

// Check if file exists
if ($user->image_path) {
    $storagePath = storage_path('app/public/' . $user->image_path);
    $publicPath = public_path('storage/' . $user->image_path);
    echo "\nStorage path: " . $storagePath . "\n";
    echo "Storage exists: " . (file_exists($storagePath) ? 'YES' : 'NO') . "\n";
    echo "\nPublic path: " . $publicPath . "\n";
    echo "Public exists: " . (file_exists($publicPath) ? 'YES' : 'NO') . "\n";
}

// Check storage link
$storageLink = public_path('storage');
echo "\nStorage symlink: " . $storageLink . "\n";
echo "Symlink exists: " . (file_exists($storageLink) ? 'YES' : 'NO') . "\n";
echo "Is link: " . (is_link($storageLink) ? 'YES' : 'NO') . "\n";
