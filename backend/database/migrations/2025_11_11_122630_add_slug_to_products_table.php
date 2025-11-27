<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\Product;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add slug column as nullable first (if it doesn't exist)
        if (!Schema::hasColumn('products', 'slug')) {
            Schema::table('products', function (Blueprint $table) {
                $table->string('slug')->nullable()->after('code');
            });
        }

        // Generate slugs for existing products
        Product::chunk(100, function ($products) {
            foreach ($products as $product) {
                if (empty($product->slug)) {
                    $product->slug = Str::slug($product->name);
                    $product->save();
                }
            }
        });

        // Make slug unique after populating
        Schema::table('products', function (Blueprint $table) {
            $table->string('slug')->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
