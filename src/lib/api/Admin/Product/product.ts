import {ProductResponse, Product, ApiError} from '@/types';
import {api} from '@/utils/axios';

// Fetch all products
export const getAllProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await api.get<ProductResponse>('/admin/products');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching products:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Create a new product
export const createProduct = async (
  product: Product,
): Promise<ProductResponse> => {
  try {
    const response = await api.post<ProductResponse>(
      '/admin/products/create',
      product,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error creating product:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Update an existing product
export const updateProduct = async (
  id: string,
  product: Product,
): Promise<ProductResponse> => {
  try {
    const response = await api.put<ProductResponse>(
      `/admin/products/update/${id}`,
      product,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error updating product:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<ProductResponse> => {
  try {
    const response = await api.delete<ProductResponse>(
      `/admin/products/delete/${id}`,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error deleting product:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
