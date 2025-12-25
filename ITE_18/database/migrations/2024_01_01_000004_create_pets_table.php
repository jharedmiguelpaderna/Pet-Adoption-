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
        Schema::create('pets', function (Blueprint $table) {
            $table->id('pet_id');
            $table->foreignId('shelter_id')->constrained('shelters', 'shelter_id')->onDelete('cascade');
            $table->string('name', 100);
            $table->string('species', 50);
            $table->string('breed', 100)->nullable();
            $table->integer('age')->nullable();
            $table->string('gender', 10)->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->string('health_status', 100)->nullable();
            $table->string('food_preferences', 255)->nullable();
            $table->date('last_vet_visit')->nullable();
            $table->date('next_vet_visit_due')->nullable();
            $table->string('adoption_status', 50)->default('available');
            $table->date('date_admitted')->nullable();
            $table->text('description')->nullable();
            $table->text('photo_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
