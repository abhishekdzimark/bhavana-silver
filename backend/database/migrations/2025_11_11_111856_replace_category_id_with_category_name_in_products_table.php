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
            // Add category name field
            $table->string('category')->nullable()->after('details');
            
            // Drop category_id foreign key and column if it exists
            if (Schema::hasColumn('products', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Add back category_id
            $table->unsignedBigInteger('category_id')->nullable()->after('details');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            
            // Drop category name field
            if (Schema::hasColumn('products', 'category')) {
                $table->dropColumn('category');
            }
        });
    }
};
