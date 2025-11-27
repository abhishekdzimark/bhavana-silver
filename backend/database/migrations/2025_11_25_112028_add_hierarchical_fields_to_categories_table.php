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
        Schema::table('categories', function (Blueprint $table) {
            // Self-referencing foreign key for parent category
            $table->foreignId('parent_id')->nullable()->after('id')->constrained('categories')->onDelete('cascade');
            
            // Category level: 0 = parent, 1 = sub-category, 2 = child-category
            $table->unsignedTinyInteger('level')->default(0)->after('parent_id');
            
            // Description for category details
            $table->text('description')->nullable()->after('slug');
            
            // Active status for enabling/disabling categories
            $table->boolean('is_active')->default(true)->after('description');
            
            // Order for custom sorting within same parent
            $table->integer('order')->default(0)->after('is_active');
            
            // Indexes for performance
            $table->index('parent_id');
            $table->index('level');
            $table->index('is_active');
            $table->index(['parent_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            // Drop indexes first
            $table->dropIndex(['parent_id', 'order']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['level']);
            $table->dropIndex(['parent_id']);
            
            // Drop foreign key and columns
            $table->dropForeign(['parent_id']);
            $table->dropColumn(['parent_id', 'level', 'description', 'is_active', 'order']);
        });
    }
};
