import {createEpinRequest, getEpinRequests} from '@/lib/api/Customer/epin';
import {EpinResponse, EpinRequestPayload} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';

// Hook to create an E-Pin request
export const useCreateEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EpinResponse,
    unknown,
    {id: string; payload: EpinRequestPayload}
  >({
    mutationFn: ({id, payload}) => createEpinRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
      }); // Invalidate cache after creation
      console.log('E-Pin request created successfully');
    },
    onError: (error) => {
      console.error('Failed to create E-Pin request:', error);
    },
  });
};

// Hook to fetch E-Pin requests by user ID
export const useGetEpinRequests = (id: string) => {
  return useQuery<EpinResponse[]>({
    queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
    queryFn: () => getEpinRequests(id),
  });
};
