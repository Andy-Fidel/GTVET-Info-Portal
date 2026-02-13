<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = App\Models\User::find(1);
$user->image_path = 'users/Z4LHgxvv5nVCcbn5J4bwagAT93na3RkvukWhsQ25.jpg';
$user->save();

echo "Updated user image_path to: " . $user->image_path . "\n";
echo "Profile Picture URL: " . $user->profile_picture_url . "\n";
