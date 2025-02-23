import {EpinResponse, ProductListResponse, ProductResponse} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';
import {
  createRepurchaseRequest,
  getAllRepurchaseProducts,
} from '@/lib/api/Customer/repurchaseproduct';
import toast from 'react-hot-toast';

export const useGetAllRepurchaseProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: ['Repurchase'],
    queryFn: getAllRepurchaseProducts,
  });
};

export const useCreateRepurchaseRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ProductListResponse,
    unknown,
    {uerid: string; productId: string; paidAmount: number; imageFile: File}
  >({
    mutationFn: ({uerid, productId, paidAmount, imageFile}) =>
      createRepurchaseRequest(uerid, productId, paidAmount, imageFile),
    onSuccess: () => {
      toast.success('Repurchase request created successfully');
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
      }); // Invalidate cache after creation
    },
    onError: (error) => {
      console.error('Failed to create E-Pin request:', error);
    },
  });
};
