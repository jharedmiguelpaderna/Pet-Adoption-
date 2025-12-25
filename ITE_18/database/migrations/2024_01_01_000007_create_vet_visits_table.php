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
        Schema::create('vet_visits', function (Blueprint $table) {
            $table->id('vet_id');
            $table->foreignId('pet_id')->constrained('pets', 'pet_id')->onDelete('cascade');
            $table->string('vet_name', 100);
            $table->date('visit_date');
            $table->string('purpose', 100)->nullable();
            $table->string('diagnosis', 255)->nullable();
            $table->string('treatment', 255)->nullable();
            $table->text('remarks')->nullable();
            $table->date('next_visit_due')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vet_visits');
    }
};
