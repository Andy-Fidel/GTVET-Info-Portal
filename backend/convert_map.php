<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$url = 'https://raw.githubusercontent.com/virgoaugustine/Ghana-GeoJSON-data/master/ghana_regions.json';
$arrContextOptions = [
    "ssl" => [
        "verify_peer" => false,
        "verify_peer_name" => false,
    ],
];
$json = file_get_contents($url, false, stream_context_create($arrContextOptions));
if (!$json) {
    die("Failed to fetch JSON from $url");
}
$data = json_decode($json, true);
if (!$data) {
    die("Failed to decode JSON");
}

$regions = [];
$minLon = 180; $maxLon = -180; $minLat = 90; $maxLat = -90;

foreach ($data['features'] as $feature) {
    if ($feature['geometry']['type'] === 'Polygon') {
        $coordsSet = [$feature['geometry']['coordinates'][0]];
    } else {
        $coordsSet = $feature['geometry']['coordinates']; // MultiPolygon
    }
    
    foreach ($coordsSet as $subCoords) {
        $coords = is_array($subCoords[0]) && count($subCoords[0]) === 2 ? $subCoords : $subCoords[0];
        foreach ($coords as $point) {
            $lon = $point[0];
            $lat = $point[1];
            if ($lon < $minLon) $minLon = $lon;
            if ($lon > $maxLon) $maxLon = $lon;
            if ($lat < $minLat) $minLat = $lat;
            if ($lat > $maxLat) $maxLat = $lat;
        }
    }
}

$width = 600;
$height = 800;
$padding = 40;

$scaleX = ($width - 2 * $padding) / ($maxLon - $minLon);
$scaleY = ($height - 2 * $padding) / ($maxLat - $minLat);
$scale = min($scaleX, $scaleY);

foreach ($data['features'] as $feature) {
    $name = $feature['properties']['region'];
    $pathData = "";
    
    if ($feature['geometry']['type'] === 'Polygon') {
        $coordsSet = [$feature['geometry']['coordinates'][0]];
    } else {
        $coordsSet = $feature['geometry']['coordinates'];
    }

    foreach ($coordsSet as $subCoords) {
        $coords = is_array($subCoords[0]) && count($subCoords[0]) === 2 ? $subCoords : $subCoords[0];
        $pathData .= "M ";
        foreach ($coords as $i => $point) {
            $x = ($point[0] - $minLon) * $scale + $padding;
            $y = ($maxLat - $point[1]) * $scale + $padding;
            $pathData .= round($x, 2) . "," . round($y, 2) . ($i === count($coords) - 1 ? " Z " : " L ");
        }
    }
    
    $regions[] = [
        'name' => $name,
        'path' => trim($pathData)
    ];
}

file_put_contents('map_paths.json', json_encode($regions, JSON_PRETTY_PRINT));
echo "Saved " . count($regions) . " regions to map_paths.json\n";
