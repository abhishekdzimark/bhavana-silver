<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Orchid\Filters\Filterable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\Where;

class Category extends Model
{
    use HasFactory, AsSource, Filterable;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'level',
        'description',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'level' => 'integer',
        'order' => 'integer',
    ];

    protected $allowedFilters = [
        'name' => Like::class,
        'level' => Where::class,
        'is_active' => Where::class,
        'parent_id' => Where::class,
    ];

    protected $allowedSorts = [
        'name',
        'level',
        'order',
        'created_at',
    ];

    /**
     * Get the parent category
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Get all child categories
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('order');
    }

    /**
     * Get all products in this category
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    /**
     * Get all ancestor categories (parent, grandparent, etc.)
     */
    public function ancestors()
    {
        $ancestors = collect();
        $category = $this->parent;

        while ($category) {
            $ancestors->push($category);
            $category = $category->parent;
        }

        return $ancestors->reverse();
    }

    /**
     * Get all descendant categories (children, grandchildren, etc.)
     */
    public function descendants()
    {
        $descendants = collect();

        foreach ($this->children as $child) {
            $descendants->push($child);
            $descendants = $descendants->merge($child->descendants());
        }

        return $descendants;
    }

    /**
     * Get the full category path (e.g., "Electronics > Phones > Smartphones")
     */
    public function getFullPathAttribute()
    {
        $path = $this->ancestors()->pluck('name')->toArray();
        $path[] = $this->name;

        return implode(' > ', $path);
    }

    /**
     * Scope to get only active categories
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get only root/parent categories (level 0)
     */
    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id')->orWhere('level', 0);
    }

    /**
     * Scope to filter by level
     */
    public function scopeLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    /**
     * Get level name for display
     */
    public function getLevelNameAttribute()
    {
        return match($this->level) {
            0 => 'Parent',
            1 => 'Sub-category',
            2 => 'Child-category',
            default => 'Unknown',
        };
    }

    /**
     * Check if category can have children (max depth is 2)
     */
    public function canHaveChildren()
    {
        return $this->level < 2;
    }
}
