import {api} from '@/utils/axios';

export const getAllRepurchaseProducts = async () => {
  try {
    const response = await api.get('/product/repurchase');
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error fetching products:', err.message);
    throw err;
  }
};

export const createRepurchaseRequest = async (
  uerid: string,
  productId: string,
  paidAmount: number,
  imageFile: File,
) => {
  try {
    // Prepare the form data
    const formData = new FormData();
    formData.append('paidAmount', String(paidAmount));
    formData.append('imageFile', imageFile);
    formData.append('userId', uerid);
    formData.append('productId', productId);
    console.log('formdata', formData);

    // Send the POST request with form data
    const response = await api.post(`/customer/repurchase`, formData);
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error creating request:', err.message);
    throw err;
  }
};
