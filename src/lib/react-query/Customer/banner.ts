import {getBanners} from '@/lib/api/Customer/banner';
import {useQuery} from '@tanstack/react-query';
import {CUSTOMER_BANNERS_QUERY_KEYS} from '../QueryKeys';

export const useGetBanners = () => {
  return useQuery({
    queryKey: [CUSTOMER_BANNERS_QUERY_KEYS.BANNERS],
    queryFn: () => getBanners(),
  });
};
