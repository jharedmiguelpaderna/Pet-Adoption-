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
        Schema::table('adopters', function (Blueprint $table) {
            $table->string('last_name', 100)->nullable()->change();
            $table->string('address', 255)->nullable()->change();
            $table->string('phone', 20)->nullable()->change();
            $table->date('birth_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('adopters', function (Blueprint $table) {
            $table->string('last_name', 100)->nullable(false)->change();
            $table->string('address', 255)->nullable(false)->change();
            $table->string('phone', 20)->nullable(false)->change();
            $table->date('birth_date')->nullable(false)->change();
        });
    }
};
