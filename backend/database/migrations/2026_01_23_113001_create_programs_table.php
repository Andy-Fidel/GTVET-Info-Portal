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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institution_id')->nullable()->constrained('institutions')->onDelete('cascade');
            $table->string('title'); // 'name' maps to this
            $table->string('code')->nullable();
            $table->text('description')->nullable();
            $table->text('career_paths')->nullable();
            $table->string('category')->nullable();
            $table->string('duration')->nullable();
            $table->string('level')->nullable();
            $table->string('intake_capacity')->nullable();
            $table->text('entry_requirements')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
