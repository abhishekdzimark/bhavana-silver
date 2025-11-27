import productsData from '../data/products.json';

/**
 * Get all products
 */
export const getAllProducts = () => {
  return productsData.products;
};

/**
 * Get product by ID
 */
export const getProductById = (id) => {
  return productsData.products.find(product => product.id === id);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category) => {
  if (!category) return productsData.products;
  return productsData.products.filter(product => product.category === category);
};

/**
 * Get products by stone
 */
export const getProductsByStone = (stone) => {
  if (!stone) return productsData.products;
  return productsData.products.filter(product => product.stone === stone);
};

/**
 * Get products by collection
 */
export const getProductsByCollection = (collection) => {
  if (!collection) return productsData.products;
  return productsData.products.filter(product => product.collection === collection);
};

/**
 * Get products by category, stone, subcategory, and collection
 */
export const getProductsByCategoryAndStone = (category, stoneOrSubcategory, collection) => {
  let products = productsData.products;
  
  if (category) {
    products = products.filter(product => product.category === category);
  }
  
  if (stoneOrSubcategory) {
    // Check if it matches subcategory (case-insensitive) or stone
    products = products.filter(product => 
      product.subcategory?.toLowerCase() === stoneOrSubcategory.toLowerCase() ||
      product.stone === stoneOrSubcategory.toLowerCase()
    );
  }
  
  if (collection) {
    products = products.filter(product => product.collection === collection);
  }
  
  return products;
};

/**
 * Get related products (same category, different product)
 */
export const getRelatedProducts = (productId, category, limit = 4) => {
  return productsData.products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, limit);
};

/**
 * Search products by query (searches in name, description, category, stone, collection)
 */
export const searchProducts = (query) => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return productsData.products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm) ||
      product.collection.toLowerCase().includes(searchTerm) ||
      product.stone.toLowerCase().includes(searchTerm) ||
      product.style.toLowerCase().includes(searchTerm) ||
      product.material.toLowerCase().includes(searchTerm) ||
      product.id.toLowerCase().includes(searchTerm)
    );
  });
};

/**
 * Get products that are ready to ship
 */
export const getReadyToShipProducts = () => {
  return productsData.products.filter(product => product.readyToShip === true);
};
