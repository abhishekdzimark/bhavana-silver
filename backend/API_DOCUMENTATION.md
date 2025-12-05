# Product & Category API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

---

## Category Endpoints

### 1. Get All Categories

**Endpoint:** `GET /api/v1/categories`

**Query Parameters:**
- `level` (optional) - Filter by hierarchy level (0, 1, or 2)
- `include_inactive` (optional, default: false) - Include inactive categories

**Example Request:**
```bash
curl http://localhost:8000/api/v1/categories?level=0
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jewelry",
      "slug": "jewelry",
      "full_path": "Jewelry",
      "level": 0,
      "level_name": "Parent",
      "parent_id": null,
      "description": "All jewelry items",
      "is_active": true,
      "order": 0,
      "created_at": "2025-12-02T09:30:00.000000Z",
      "updated_at": "2025-12-02T09:30:00.000000Z"
    },
    {
      "id": 2,
      "name": "Necklaces",
      "slug": "necklaces",
      "full_path": "Jewelry > Necklaces",
      "level": 1,
      "level_name": "Sub-category",
      "parent_id": 1,
      "description": "Beautiful necklaces",
      "is_active": true,
      "order": 1,
      "created_at": "2025-12-02T09:31:00.000000Z",
      "updated_at": "2025-12-02T09:31:00.000000Z"
    }
  ]
}
```

---

### 2. Get Single Category

**Endpoint:** `GET /api/v1/categories/{id}`

**Example Request:**
```bash
curl http://localhost:8000/api/v1/categories/1
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jewelry",
    "slug": "jewelry",
    "full_path": "Jewelry",
    "level": 0,
    "level_name": "Parent",
    "parent_id": null,
    "description": "All jewelry items",
    "is_active": true,
    "order": 0,
    "parent": null,
    "children": [
      {
        "id": 2,
        "name": "Necklaces",
        "slug": "necklaces",
        "level": 1
      }
    ],
    "product_count": 15,
    "created_at": "2025-12-02T09:30:00.000000Z",
    "updated_at": "2025-12-02T09:30:00.000000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

---

### 3. Create New Category

**Endpoint:** `POST /api/v1/categories`

**Request Body:**
```json
{
  "name": "Rings",
  "parent_id": 1,
  "description": "Beautiful rings collection",
  "is_active": true,
  "order": 2
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rings",
    "parent_id": 1,
    "description": "Beautiful rings collection"
  }'
```

**Example Response (201 Created):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 3,
    "name": "Rings",
    "slug": "rings",
    "full_path": "Jewelry > Rings",
    "level": 1,
    "level_name": "Sub-category",
    "parent_id": 1,
    "description": "Beautiful rings collection",
    "is_active": true,
    "order": 2,
    "created_at": "2025-12-02T10:00:00.000000Z",
    "updated_at": "2025-12-02T10:00:00.000000Z"
  }
}
```

**Validation Rules:**
- `name`: Required, max 255 characters
- `slug`: Optional (auto-generated), unique
- `parent_id`: Optional, must exist in categories table
- `description`: Optional
- `is_active`: Optional boolean (default: true)
- `order`: Optional integer (default: 0)

**Error Response (422 Validation Error):**
```json
{
  "success": false,
  "message": "Cannot create category. Maximum depth of 3 levels reached."
}
```

---

## Product Endpoints

### 1. Get All Products (Paginated)

**Endpoint:** `GET /api/v1/products`

**Query Parameters:**
- `per_page` (optional, default: 15) - Number of items per page
- `category` (optional) - Filter by category ID
- `search` (optional) - Search by product name or code

**Example Request:**
```bash
curl http://localhost:8000/api/v1/products?per_page=10&search=silver
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "PROD-001",
      "slug": "silver-necklace",
      "name": "Silver Necklace",
      "price": "1500.00",
      "short_description": "Beautiful handcrafted silver necklace",
      "stone_size": "5mm",
      "dimensions": "10x5x3 cm",
      "plating": "Gold Plated",
      "weight": "10.50",
      "category": {
        "id": 1,
        "name": "Necklaces",
        "slug": "necklaces",
        "full_path": "Jewelry > Necklaces"
      },
      "stone": {
        "id": 1,
        "name": "Ethiopian Opal",
        "slug": "ethiopian-opal",
        "properties": {
          "color": "Multi-color",
          "origin": "Ethiopia"
        }
      },
      "image": "http://localhost:8000/storage/2025/12/02/product.jpg",
      "images": [
        {
          "id": 1,
          "url": "http://localhost:8000/storage/2025/12/02/product.jpg",
          "name": "product",
          "extension": "jpg"
        }
      ],
      "created_at": "2025-12-02T09:30:00.000000Z",
      "updated_at": "2025-12-02T09:30:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 75,
    "from": 1,
    "to": 15
  }
}
```

---

### 2. Get Single Product by ID

**Endpoint:** `GET /api/v1/products/{id}`

**Example Request:**
```bash
curl http://localhost:8000/api/v1/products/1
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "PROD-001",
    "slug": "silver-necklace",
    "name": "Silver Necklace",
    "price": "1500.00",
    "short_description": "Beautiful handcrafted silver necklace",
    "description": "This exquisite silver necklace features intricate craftsmanship...",
    "details": {
      "material": "925 Sterling Silver",
      "finish": "Polished",
      "clasp_type": "Lobster"
    },
    "stone_size": "5mm",
    "dimensions": "10x5x3 cm",
    "plating": "Gold Plated",
    "weight": "10.50",
    "category": { ... },
    "stone": { ... },
    "image": "http://localhost:8000/storage/2025/12/02/product.jpg",
    "images": [ ... ],
    "created_at": "2025-12-02T09:30:00.000000Z",
    "updated_at": "2025-12-02T09:30:00.000000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 3. Get Single Product by Slug

**Endpoint:** `GET /api/v1/products/slug/{slug}`

**Example Request:**
```bash
curl http://localhost:8000/api/v1/products/slug/silver-necklace
```

**Example Response:**
Same as "Get Single Product by ID" above.

---

## React Frontend Integration

### Installation

```bash
npm install axios
```

### Example Usage

#### Fetch Categories

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Get all active categories
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    
    console.log('Categories:', response.data.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get categories by level
const fetchCategoriesByLevel = async (level) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      params: { level }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get single category with details
const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
    
    console.log('Category:', response.data.data);
    console.log('Product Count:', response.data.data.product_count);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Create new category
const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
    
    console.log('Created Category:', response.data.data);
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 422) {
      console.error('Validation Error:', error.response.data.message);
    }
    throw error;
  }
};

// Example: Create a new category
await createCategory({
  name: 'Bracelets',
  parent_id: 1,
  description: 'Beautiful bracelets collection',
  is_active: true,
  order: 3
});
```

#### Fetch All Products

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Get paginated products
const fetchProducts = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { per_page: perPage, page }
    });
    
    console.log('Products:', response.data.data);
    console.log('Total:', response.data.meta.total);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Search products
const searchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { search: searchTerm }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Filter by single category
const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { category: categoryId }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Filter by multiple categories
const fetchProductsByCategories = async (categoryIds) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { categories: categoryIds.join(',') }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products by categories:', error);
    throw error;
  }
};

// Example: Get products from categories 1, 2, and 3
await fetchProductsByCategories([1, 2, 3]);
```

#### Fetch Single Product

```javascript
// By ID
const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    
    console.log('Product:', response.data.data);
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Product not found');
    }
    throw error;
  }
};

// By Slug (SEO-friendly)
const fetchProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/slug/${slug}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
```

#### React Component Example

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/products', {
        params: { per_page: 12, page }
      });
      
      setProducts(response.data.data);
      setPagination(response.data.meta);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.short_description}</p>
          <div className="product-details">
            <span>₹{product.price}</span>
            {product.weight && <span>{product.weight}g</span>}
            {product.plating && <span>{product.plating}</span>}
          </div>
          {product.category && (
            <span className="category">{product.category.name}</span>
          )}
        </div>
      ))}
      
      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={pagination.current_page === 1}
          onClick={() => fetchProducts(pagination.current_page - 1)}
        >
          Previous
        </button>
        <span>Page {pagination.current_page} of {pagination.last_page}</span>
        <button 
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => fetchProducts(pagination.current_page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
```

---

## CORS Configuration

If your React app runs on a different port (e.g., `http://localhost:3000`), you need to enable CORS.

### Update `config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## New Product Fields

The following fields have been added to the product API:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `stone_size` | string | Size or grade of the stone | "5mm", "Large", "Medium" |
| `dimensions` | string | Product dimensions | "10x5x3 cm", "2 inches" |
| `plating` | string | Type of plating | "Gold Plated", "Silver Plated" |
| `weight` | decimal | Product weight in grams | "10.50" |

All fields are nullable and will return `null` if not set.
