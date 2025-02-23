import React, {useEffect, useState} from 'react';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthContext} from '@/context/AuthContext';
import {repurchaseProductSchema} from '@/lib/validation/repurchaseProductSchema';
import {z} from 'zod';
import {
  useCreateRepurchaseRequest,
  useGetAllRepurchaseProducts,
} from '@/lib/react-query/Customer/repurchase';

type FormValues = z.infer<typeof repurchaseProductSchema>;

const RepurchaseProduct: React.FC = () => {
  const {user} = useAuthContext();
  const methods = useForm<FormValues>({
    resolver: zodResolver(repurchaseProductSchema),
    defaultValues: {
      crnNo: user?.user?.crnNo,
    },
  });

  const {data: repurchaseData} = useGetAllRepurchaseProducts();
  // console.log('repurchaseData', repurchaseData);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const {
    mutate: repurchaseProduct,
    isPending,
    isSuccess,
  } = useCreateRepurchaseRequest();

  const handleCardSelect = (productId: string) => {
    setSelectedProductId(productId);
  };
  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      setSelectedProductId(null);
    }
  }, [isSuccess]);
  const onSubmit = (formValues: FormValues) => {
    // console.log('Form Values:', formValues);
    // console.log('Selected Product ID:', selectedProductId);
    repurchaseProduct({
      uerid: formValues.crnNo,
      productId: selectedProductId || '',
      paidAmount: formValues.paidAmount,
      imageFile: formValues.imageFile[0] || '',
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        {/* Sponsor Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Repurchase Product
          </h1>
          <p className="col-span-12 text-lg font-semibold">
            Name: &nbsp;{user?.user?.fullname?.replace('_', ' ')}
          </p>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="crnNo"
              label="Your CRN NO"
              disabled
              placeholder="Enter your CRN NO"
            />
          </div>
        </div>

        {/* Product Selection */}
        <h1 className="mb-4 text-lg font-semibold">Select a Product</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(repurchaseData) &&
            repurchaseData?.map((product) => (
              <div
                key={product.id}
                className={`cursor-pointer rounded-lg border p-4 shadow transition ${
                  selectedProductId === product.id
                    ? 'border-blue-500 dark:border-blue-500'
                    : 'border-gray-300 dark:border-gray-700'
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
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

        {/* Paid Amount Input */}
        <div className="flex-1 md:col-span-6">
          <GenericInputField
            name="paidAmount"
            label="Paid Amount"
            placeholder="Enter Paid Amount"
          />
        </div>

        {/* Image Upload */}
        <div className="flex-1">
          <label htmlFor="imageFile" className="mb-2 block text-sm font-medium">
            Upload Image
          </label>
          <input
            type="file"
            {...methods.register('imageFile')}
            className="text-gray-500 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            multiple
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Loading...' : 'Save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default RepurchaseProduct;
