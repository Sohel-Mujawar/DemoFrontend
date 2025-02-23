import {api} from '@/utils/axios';

export const getnetwork = async (crn: string) => {
  try {
    const response = await api.get(`/nodetree/${crn}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
