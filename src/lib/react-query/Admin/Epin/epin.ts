import {
  createEPin,
  getAllEPins,
  rejectEpinRequest,
} from '@/lib/api/Admin/Epin/epin';
import {
  CreateEPinResponse,
  CreateEPinRequest,
  GetAllEPinsResponse,
  RejectEpinRequestResponse,
} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {ADMIN_EPIN_QUERY_KEYS} from '../../QueryKeys';

export const useCreateEPin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateEPinResponse,
    unknown,
    {id: string; payload: CreateEPinRequest}
  >({
    mutationFn: ({id, payload}) => createEPin(id, payload),
    onSuccess: (res) => {
      console.log('E-Pin created successfully:', res);
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
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

// Hook to reject an E-Pin request
export const useRejectEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RejectEpinRequestResponse, unknown, string>({
    mutationFn: (id) => rejectEpinRequest(id),
    onSuccess: (res) => {
      console.log('E-Pin request rejected successfully:', res);
    },
    onError: (error) => {
      console.error('Failed to reject E-Pin request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
      });
    },
  });
};
