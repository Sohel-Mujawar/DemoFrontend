import {
  ApproveEpinRequest,
  createEPin,
  EpinHistory,
  getAdminEpins,
  getAllEPins,
  getCustomerEpins,
  getEpinRequest,
  rejectEpinRequest,
} from '@/lib/api/Admin/Epin/epin';
import {
  CreateEPinResponse,
  CreateEPinRequest,
  GetAllEPinsResponse,
  RejectEpinRequestResponse,
  ApiError,
} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {ADMIN_EPIN_QUERY_KEYS} from '../../QueryKeys';

export const useCreateEPin = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateEPinResponse, ApiError, {epincount: number}>({
    mutationFn: ({epincount}) => createEPin(epincount), // Pass the epincount here
    onSuccess: () => {
      // Additional logic on success if needed
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
      // Handle errors (e.g., display a toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS], // Replace with the actual query key
      });
    },
  });
};

// Hook to fetch all E-Pins
export const useGetAllEPins = () => {
  return useQuery<GetAllEPinsResponse>({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
    queryFn: getAllEPins,
  });
};

export const useGetAdminPins = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
    queryFn: getAdminEpins,
  });
};

export const useGetCustomerEpins = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.CUSTOMERS_EPINS],
    queryFn: () => getCustomerEpins(),
  });
};

export const useApproveEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateEPinResponse,
    unknown,
    {id: string; data: {epincount: number}}
  >({
    mutationFn: ({id, data}) => ApproveEpinRequest(id, data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to approve E-Pin request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
      });
    },
  });
};

// Hook to reject an E-Pin request
export const useRejectEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RejectEpinRequestResponse, unknown, string>({
    mutationFn: (id) => rejectEpinRequest(id),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to reject E-Pin request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
      });
    },
  });
};

export const useGetAllEpinRequests = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
    queryFn: getEpinRequest,
  });
};

export const usegetEpinHistory = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_EPIN_HISTORY],
    queryFn: EpinHistory,
  });
};
