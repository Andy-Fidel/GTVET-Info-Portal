<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Program;
use Illuminate\Support\Facades\DB;

$programs = Program::whereNotNull('institution_id')->get();
$count = 0;

foreach ($programs as $p) {
    if ($p->institution_id) {
        $exists = DB::table('institution_program')
            ->where('institution_id', $p->institution_id)
            ->where('program_id', $p->id)
            ->exists();
            
        if (!$exists) {
            DB::table('institution_program')->insert([
                'institution_id' => $p->institution_id,
                'program_id' => $p->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $count++;
        }
    }
}

echo "Migrated $count associations.\n";
