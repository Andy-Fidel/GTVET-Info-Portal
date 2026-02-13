<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Users in database:\n";
echo "==================\n";
$users = App\Models\User::all();
echo "Total: " . $users->count() . "\n\n";

foreach($users as $u) {
    echo "ID: " . $u->id . "\n";
    echo "Email: " . $u->email . "\n";
    echo "Role: " . ($u->role ?? 'NULL') . "\n";
    echo "---\n";
}
