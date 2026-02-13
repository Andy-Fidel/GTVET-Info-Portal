<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\Request;
use App\Http\Controllers\Api\InstitutionController;

$controller = new InstitutionController();

echo "Testing ?region=Ahafo&search=&type=\n";
$request = Request::create('/api/institutions', 'GET', [
    'region' => 'Ahafo',
    'search' => '',
    'type' => ''
]);

$response = $controller->index($request);
$data = json_decode($response->getContent(), true);

echo "Success: " . ($data['success'] ? 'YES' : 'NO') . "\n";
echo "Count: " . count($data['data']) . "\n";
foreach ($data['data'] as $inst) {
    echo "- " . $inst['name'] . " | Region: " . $inst['region'] . "\n";
}
