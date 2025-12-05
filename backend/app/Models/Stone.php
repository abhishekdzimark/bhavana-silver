<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Orchid\Filters\Filterable;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Types\Like;

class Stone extends Model
{
    use HasFactory, AsSource, Filterable, Attachable;

    protected $fillable = [
        'name',
        'slug',
        'size',
        'image',
        'description',
        'properties'
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    protected $allowedFilters = [
        'name' => Like::class,
    ];



    protected $allowedSorts = [
        'name',
        'created_at',
    ];

    /**
     * Get all products using this stone
     */
    public function products()
    {
        return $this->hasMany(\App\Models\Product::class, 'stone_id');
    }
}
