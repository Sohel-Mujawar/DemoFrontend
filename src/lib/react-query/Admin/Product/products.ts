import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/api/Admin/Product/product';
import {ProductResponse, Product, ApiError} from '@/types';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {ADMIN_PRODUCT_QUERY_KEYS} from '../../QueryKeys';

export const useGetAllProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: [ADMIN_PRODUCT_QUERY_KEYS.PRODUCTS],
    queryFn: getAllProducts,
  });
};

// Hook to create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_PRODUCT_QUERY_KEYS.PRODUCTS],
      });
    },
    onError: (error: unknown) => {
      const err = error as ApiError; // Type assertion to ApiError
      console.error(
        'Failed to create product:',
        err.response?.data.message || err.message,
      );
    },
  });
};

// Hook to update an existing product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {id: string; product: Product}) =>
      updateProduct(data.id, data.product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_PRODUCT_QUERY_KEYS.PRODUCTS],
      });
    },
    onError: (error: unknown) => {
      const err = error as ApiError; // Type assertion to ApiError
      console.error(
        'Failed to update product:',
        err.response?.data.message || err.message,
      );
    },
  });
};

// Hook to delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_PRODUCT_QUERY_KEYS.PRODUCTS],
      });
    },
    onError: (error: unknown) => {
      const err = error as ApiError; // Type assertion to ApiError
      console.error(
        'Failed to delete product:',
        err.response?.data.message || err.message,
      );
    },
  });
};
