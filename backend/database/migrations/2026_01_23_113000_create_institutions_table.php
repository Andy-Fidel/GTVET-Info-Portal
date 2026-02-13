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
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('institution_code')->nullable();
            $table->string('category')->nullable(); // A, B, C
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->string('region')->nullable();
            $table->string('district')->nullable();
            $table->string('status')->nullable(); // Day, Boarding
            $table->string('gender')->nullable(); // Mixed, Boys, Girls
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('established_year')->nullable();
            $table->text('programmes')->nullable(); // Summary text
            $table->string('image_path')->nullable();
            $table->string('type')->default('Public'); // Public, Private
            $table->string('postal_address')->nullable();
            $table->string('structure_of_training')->nullable(); // Formal, Informal, etc.
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutions');
    }
};
