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
        Schema::table('products', function (Blueprint $table) {
            $table->string('stone_size')->nullable()->after('stone_id');
            $table->string('dimensions')->nullable()->after('stone_size');
            $table->string('plating')->nullable()->after('dimensions');
            $table->decimal('weight', 8, 2)->nullable()->after('plating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['stone_size', 'dimensions', 'plating', 'weight']);
        });
    }
};
