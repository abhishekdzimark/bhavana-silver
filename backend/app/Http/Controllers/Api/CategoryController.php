<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Get all active categories
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $level = $request->query('level');
        $includeInactive = $request->query('include_inactive', false);

        $query = Category::query();

        // Filter by active status
        if (!$includeInactive) {
            $query->where('is_active', true);
        }

        // Filter by level if provided
        if ($level !== null) {
            $query->where('level', $level);
        }

        $categories = $query->orderBy('level')
            ->orderBy('order')
            ->orderBy('name')
            ->get();

        // Transform categories to include full path
        $data = $categories->map(function ($category) {
            return $this->transformCategory($category);
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    /**
     * Get single category by ID
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $category = Category::with(['parent', 'children'])->find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->transformCategory($category, true),
        ]);
    }

    /**
     * Create new category
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories', 'slug'),
            ],
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Ensure slug uniqueness
        $baseSlug = $validated['slug'];
        $counter = 1;
        while (Category::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $baseSlug . '-' . $counter;
            $counter++;
        }

        // Calculate level based on parent
        if (empty($validated['parent_id'])) {
            $validated['level'] = 0;
            $validated['parent_id'] = null;
        } else {
            $parent = Category::find($validated['parent_id']);
            
            if ($parent) {
                // Prevent creating categories deeper than level 2
                if ($parent->level >= 2) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot create category. Maximum depth of 3 levels reached.',
                    ], 422);
                }
                
                $validated['level'] = $parent->level + 1;
            }
        }

        // Set defaults
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['order'] = $validated['order'] ?? 0;

        // Create category
        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $this->transformCategory($category),
        ], 201);
    }

    /**
     * Transform category model to API response format
     * 
     * @param Category $category
     * @param bool $includeRelations
     * @return array
     */
    private function transformCategory(Category $category, bool $includeRelations = false): array
    {
        $data = [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'full_path' => $category->full_path,
            'level' => $category->level,
            'level_name' => $category->level_name,
            'parent_id' => $category->parent_id,
            'description' => $category->description,
            'is_active' => $category->is_active,
            'order' => $category->order,
            'created_at' => $category->created_at?->toISOString(),
            'updated_at' => $category->updated_at?->toISOString(),
        ];

        // Include parent and children for detail view
        if ($includeRelations) {
            $data['parent'] = $category->parent ? [
                'id' => $category->parent->id,
                'name' => $category->parent->name,
                'slug' => $category->parent->slug,
            ] : null;

            $data['children'] = $category->children->map(function ($child) {
                return [
                    'id' => $child->id,
                    'name' => $child->name,
                    'slug' => $child->slug,
                    'level' => $child->level,
                ];
            });

            $data['product_count'] = $category->products()->count();
        }

        return $data;
    }
}
