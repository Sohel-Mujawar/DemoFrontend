import {useQuery} from '@tanstack/react-query';
import {getnetwork} from '../api/network';
import {NETWORK_QUERY_KEYS} from './QueryKeys';

export const useGetNetwotkTree = (crn: string) => {
  return useQuery({
    queryKey: [NETWORK_QUERY_KEYS.NETWORK],
    queryFn: () => getnetwork(crn),
  });
};
