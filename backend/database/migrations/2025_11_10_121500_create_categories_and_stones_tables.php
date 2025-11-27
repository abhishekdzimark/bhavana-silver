<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
            $table->index('name');
        });

        Schema::create('stones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->json('properties')->nullable();
            $table->timestamps();
            $table->index('name');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('stone_id')->nullable()->constrained('stones')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
            $table->dropConstrainedForeignId('stone_id');
        });
        Schema::dropIfExists('stones');
        Schema::dropIfExists('categories');
    }
};
