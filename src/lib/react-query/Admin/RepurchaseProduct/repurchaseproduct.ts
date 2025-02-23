import {ApproveEpinRequest} from '@/lib/api/Admin/Epin/epin';
import {
  CreateEPinResponse,
  CreatePurchaseResponse,
  RejectEpinRequestResponse,
} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {ADMIN_EPIN_QUERY_KEYS} from '../../QueryKeys';
import {
  ApproveRepurchaseRequest,
  getRepurchase,
  getRepurchaseRequest,
  rejectRepurchaseRequest,
} from '@/lib/api/Admin/RepurchaseProduct/repurchaseProduct';

export const useApproveEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreatePurchaseResponse,
    unknown,
    {id: string; data: {epincount: number}}
  >({
    mutationFn: ({id, data}) => ApproveEpinRequest(id, data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to approve Repurchase request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllRePurchase'],
      });
    },
  });
};

export const useGetRePurchaseRequests = () => {
  return useQuery({
    queryKey: ['GetRePurchaseRequests'],
    queryFn: getRepurchaseRequest,
  });
};

export const useGetAllRePurchase = () => {
  return useQuery({
    queryKey: ['GetAllRePurchase'],
    queryFn: getRepurchase,
  });
};

export const useRejectRepurchaseRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RejectEpinRequestResponse, unknown, string>({
    mutationFn: (id) => rejectRepurchaseRequest(id),
    onError: (error) => {
      console.error('Failed to reject Repurchase request:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllRePurchase'],
      });
    },
  });
};

export const useApproveRepurchaseRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: ApproveRepurchaseRequest,
    onError: (error) => {
      console.error('Failed to approve Repurchase request:', error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllRePurchase'],
      });
    },
  });
};
