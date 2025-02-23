import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {z} from 'zod';
import {epinCountSchema} from '@/lib/validation/epinSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useCreateEpinRequest,
  useGetEpins,
} from '@/lib/react-query/Customer/epin';
import {useAuthContext} from '@/context/AuthContext';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';
import DisplayEpinUser from './DisplayEpinUser';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof epinCountSchema>;

const EpinUser: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinCountSchema),
  });
  const wathchfiles = methods.watch('imageFile');

  const {user} = useAuthContext();

  const {
    mutate: createEpinRequest,
    isSuccess,
    isPending,
    error,
  } = useCreateEpinRequest();

  const onSubmit = (data: FormValues) => {
    const seelctedFile =
      wathchfiles instanceof FileList ? Array.from(wathchfiles) : [];
    // console.log(data);
    createEpinRequest({
      id: user?.user.id || '',
      paidAmount: data.paidAmount,
      imageFile: seelctedFile[0],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-Pin created successfully');
      methods.reset();
    }
    if (error) {
      toast.error('Error creating E-Pin');
    }
  }, [isSuccess]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="space-y-4">
          <h1 className="mb-4 text-lg font-semibold">Sponsor Info</h1>

          {/* Input and Upload Fields in a single row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Paid Amount Input */}
            <div className="flex-1">
              <GenericInputField
                name="paidAmount"
                label="Paid Amount"
                placeholder="Enter Paid Amount"
              />
            </div>

            {/* File Upload */}
            <div className="flex-1">
              <label
                htmlFor="imageFile"
                className="mb-2 block text-sm font-medium"
              >
                Upload Image
              </label>
              <input
                type="file"
                {...methods.register('imageFile')}
                className="text-gray-500 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                multiple
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>

      {/* Additional Display */}
      <div className="mt-8">
        <DisplayEpinUser />
      </div>
    </FormProvider>
  );
};

export default EpinUser;
