<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\WhereBetween;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

class Product extends Model
{
    use HasFactory, AsSource, Filterable, Attachable;

    protected $fillable = [
        'code',
        'slug',
        'name',
        'price',
        'short_description',
        'description',
        'details',
        'category_id',
        'stone_id',
        'image',
    ];

    protected $casts = [
        'details' => 'array',
        'price' => 'decimal:2',
    ];

    protected $allowedFilters = [
        'code' => Like::class,
        'name' => Like::class,
        'price' => WhereBetween::class,
        'category.name' => Like::class,
        'stone.name' => Like::class,
    ];

    protected $allowedSorts = [
        'code', 'name', 'price', 'created_at', 'category.name', 'stone.name'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function stone()
    {
        return $this->belongsTo(Stone::class);
    }
}
