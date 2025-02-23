import {api} from '@/utils/axios';

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error fetching products:', err.message);
    throw err;
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    const response = await api.post('/admin/products/create', product);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error creating product:', err.message);
    throw err;
  }
};

// Update an existing product
export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/admin/products/update/${id}`, product);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error updating product:', err.message);
    throw err;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/products/delete/${id}`);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error deleting product:', err.message);
    throw err;
  }
};
