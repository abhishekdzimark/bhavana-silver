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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique()->comment('Setting key identifier');
            $table->json('value')->comment('Setting value stored as JSON');
            $table->string('group')->default('general')->comment('Setting group (header, footer, general)');
            $table->string('type')->default('json')->comment('Data type (json, text, image, etc.)');
            $table->text('description')->nullable()->comment('Description of the setting');
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index('key');
            $table->index('group');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
