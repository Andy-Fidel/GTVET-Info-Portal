<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Http\Controllers\Api\InstitutionController;
use Illuminate\Http\Request;

$controller = new InstitutionController();

// Test empty request
echo "Testing index with empty request:\n";
$request = Request::create('/api/institutions', 'GET');
$response = $controller->index($request);
echo $response->getContent() . "\n\n";

// Test request with Ashanti region
echo "Testing index with region=Ashanti:\n";
$request = Request::create('/api/institutions', 'GET', ['region' => 'Ashanti']);
$response = $controller->index($request);
echo $response->getContent() . "\n\n";
