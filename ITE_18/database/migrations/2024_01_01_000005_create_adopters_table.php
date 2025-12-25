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
        Schema::create('adopters', function (Blueprint $table) {
            $table->id('adopter_id');
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('address', 255);
            $table->string('phone', 20);
            $table->string('email', 100)->unique();
            $table->string('password', 255);
            $table->date('birth_date');
            $table->string('occupation', 100)->nullable();
            $table->string('company_name', 150)->nullable();
            $table->string('social_media_profile', 255)->nullable();
            $table->string('status', 20)->nullable();
            $table->string('pronouns', 20)->nullable();
            $table->string('alternate_contact_name', 100)->nullable();
            $table->string('alternate_contact_relationship', 50)->nullable();
            $table->string('alternate_contact_phone', 20)->nullable();
            $table->string('alternate_contact_email', 100)->nullable();
            $table->string('valid_id', 255)->nullable();
            $table->string('home_photos', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adopters');
    }
};
