<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('institution_program', function (Blueprint $create) {
            $create->id();
            $create->foreignId('institution_id')->constrained()->onDelete('cascade');
            $create->foreignId('program_id')->constrained()->onDelete('cascade');
            $create->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institution_program');
    }
};
