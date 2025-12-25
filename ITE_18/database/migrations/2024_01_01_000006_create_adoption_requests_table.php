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
        Schema::create('adoption_requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->foreignId('adopter_id')->constrained('adopters', 'adopter_id')->onDelete('cascade');
            $table->foreignId('pet_id')->constrained('pets', 'pet_id')->onDelete('cascade');
            $table->date('application_date');
            $table->date('online_interview_date')->nullable();
            $table->time('online_interview_time')->nullable();
            $table->enum('meet_greet', ['yes', 'no'])->default('no');
            $table->text('reason_for_adoption')->nullable();
            $table->enum('adoption_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adoption_requests');
    }
};
