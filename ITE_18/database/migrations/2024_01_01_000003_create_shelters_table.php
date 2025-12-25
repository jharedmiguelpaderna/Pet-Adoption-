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
        Schema::create('shelters', function (Blueprint $table) {
            $table->id('shelter_id');
            $table->foreignId('admin_id')->constrained('admin', 'admin_id')->onDelete('cascade');
            $table->string('shelter_name', 100);
            $table->string('staff_name', 100);
            $table->string('staff_email', 150)->nullable();
            $table->string('staff_phone', 20)->nullable();
            $table->string('location', 200);
            $table->string('contact_info', 50)->nullable();
            $table->text('description')->nullable();
            $table->string('image_url', 500)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shelters');
    }
};
