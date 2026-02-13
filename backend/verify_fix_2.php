<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\Request;
use App\Http\Controllers\Api\InstitutionController;

$controller = new InstitutionController();

$request = Request::create('/api/institutions', 'GET', [
    'region' => 'Ahafo',
    'search' => '',
    'type' => ''
]);

$response = $controller->index($request);
$data = json_decode($response->getContent(), true);

echo "RESPONSE_START\n";
echo "STATUS: " . ($data['success'] ? 'SUCCESS' : 'FAILURE') . "\n";
echo "COUNT: " . count($data['data']) . "\n";
foreach ($data['data'] as $inst) {
    echo "INSTNAME: " . $inst['name'] . "\n";
}
echo "RESPONSE_END\n";
