<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get paginated list of products
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 15);
        $category = $request->query('category');
        $categories = $request->query('categories'); // Multiple categories
        $search = $request->query('search');

        $query = Product::with(['category', 'stone', 'attachment']);

        // Filter by single category if provided
        if ($category) {
            $query->where('category_id', $category);
        }

        // Filter by multiple categories if provided
        if ($categories) {
            $categoryIds = explode(',', $categories);
            $query->whereIn('category_id', $categoryIds);
        }

        // Search by name or code if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Transform products to include image URLs
        $products->getCollection()->transform(function ($product) {
            return $this->transformProduct($product);
        });

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
            ],
        ]);
    }

    /**
     * Get single product by ID
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $product = Product::with(['category', 'stone', 'attachment'])->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->transformProduct($product, true),
        ]);
    }

    /**
     * Get single product by slug
     * 
     * @param string $slug
     * @return JsonResponse
     */
    public function showBySlug(string $slug): JsonResponse
    {
        $product = Product::with(['category', 'stone', 'attachment'])
            ->where('slug', $slug)
            ->first();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->transformProduct($product, true),
        ]);
    }

    /**
     * Transform product model to API response format
     * 
     * @param Product $product
     * @param bool $includeFullDetails
     * @return array
     */
    private function transformProduct(Product $product, bool $includeFullDetails = false): array
    {
        $data = [
            'id' => $product->id,
            'code' => $product->code,
            'sku' => $product->code, // Alias for code, as per request to rename logic
            'slug' => $product->slug,
            'name' => $product->name,
            'price' => (float) $product->price,
            'short_description' => $product->short_description,
            'description' => $product->description,
            'details' => $product->details, // JSON object with technical details
            'stone_size' => $product->stone_size,
            'dimensions' => $product->dimensions,
            'plating' => $product->plating,
            'weight' => $product->weight ? (float) $product->weight : null,
            'category' => $product->category ? [
                'id' => $product->category->id,
                'name' => $product->category->name,
                'slug' => $product->category->slug,
                'level' => $product->category->level,
                'level_name' => $product->category->level_name,
                'full_path' => $product->category->full_path,
                'parent_id' => $product->category->parent_id,
            ] : null,
            'stone' => $product->stone ? [
                'id' => $product->stone->id,
                'name' => $product->stone->name,
                'slug' => $product->stone->slug,
                'properties' => $product->stone->properties,
            ] : null,
            'image' => $product->image ? asset('storage/' . $product->image) : null,
            'images' => $product->attachment->map(function ($attachment) {
                return [
                    'id' => $attachment->id,
                    'url' => $attachment->url(),
                    'name' => $attachment->name,
                    'extension' => $attachment->extension,
                    'size' => $attachment->size,
                ];
            }),
            'created_at' => $product->created_at?->toISOString(),
            'updated_at' => $product->updated_at?->toISOString(),
        ];

        return $data;
    }
}
