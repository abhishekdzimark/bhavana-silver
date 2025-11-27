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
            // Add category_id foreign key first
            $table->foreignId('category_id')->nullable()->after('details')->constrained('categories')->onDelete('set null');
        });
        
        // Then migrate existing category string data to Category records
        $this->migrateExistingCategories();
        
        Schema::table('products', function (Blueprint $table) {
            // Drop the old category string field
            if (Schema::hasColumn('products', 'category')) {
                $table->dropColumn('category');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Add back category string field
            $table->string('category')->nullable()->after('details');
            
            // Drop category_id foreign key
            if (Schema::hasColumn('products', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }
        });
    }
    
    /**
     * Migrate existing category strings to Category records
     */
    private function migrateExistingCategories(): void
    {
        $products = DB::table('products')->whereNotNull('category')->get();
        
        foreach ($products as $product) {
            if (!empty($product->category)) {
                // Check if category already exists
                $category = DB::table('categories')
                    ->where('name', $product->category)
                    ->first();
                
                // Create category if it doesn't exist
                if (!$category) {
                    $categoryId = DB::table('categories')->insertGetId([
                        'name' => $product->category,
                        'slug' => Illuminate\Support\Str::slug($product->category),
                        'level' => 0, // Default to parent category
                        'is_active' => true,
                        'order' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                } else {
                    $categoryId = $category->id;
                }
                
                // Update product with category_id
                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['category_id' => $categoryId]);
            }
        }
    }
};
