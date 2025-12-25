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
            $table->longText('profile_picture')->nullable()->after('pronouns');
        });

        Schema::table('admin', function (Blueprint $table) {
            $table->longText('profile_picture')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('adopters', function (Blueprint $table) {
            $table->dropColumn('profile_picture');
        });

        Schema::table('admin', function (Blueprint $table) {
            $table->dropColumn('profile_picture');
        });
    }
};
