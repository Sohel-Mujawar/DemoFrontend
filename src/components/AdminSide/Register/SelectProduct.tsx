import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useRegistration} from '@/context/RegisterContext';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

interface SponserInfoProps {
  onNext: () => void;
}

export const SelectProduct: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm({
    defaultValues: {},
  });

  const {setSelectProduct} = useRegistration();
  const {data} = useGetAllProducts();
  // console.log(data);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const handleCardSelect = (productId: string) => {
    // console.log('Selected Product ID:', productId);
    setSelectedProductId(productId);
    setSelectProduct({productId});
  };

  const onSubmit = () => {
    if (selectedProductId) {
      onNext();
    } else {
      toast.error('Please select a product');
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <h1 className="mb-4 text-lg font-semibold">Select a Product</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(data) &&
            data?.map((product) => (
              <div
                key={product.id}
                className={`hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-lg border p-4 shadow ${
                  selectedProductId === product.id
                    ? 'border-blue-500 dark:border-blue-500'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                onClick={() => handleCardSelect(product.id)}
              >
                <img
                  src={product.images}
                  alt={product.name}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {product.description}
                </p>
                <div className="text-gray-700 dark:text-gray-300 mt-2">
                  <span className="text-xl font-bold">
                    ₹{product.discountedPrice}
                  </span>{' '}
                  <span className="text-gray-400 dark:text-gray-600 text-sm line-through">
                    ₹{product.actualPrice}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">Next</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
