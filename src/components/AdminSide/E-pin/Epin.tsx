import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {epinSchema} from '@/lib/validation/epinSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useCreateEPin} from '@/lib/react-query/Admin/Epin/epin';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof epinSchema>;
const Epin: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinSchema),
  });
  const {mutate: createEPin, isSuccess, isPending, error} = useCreateEPin();

  const onSubmit = (data) => {
    createEPin({
      epincount: data.count,
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">E-Pin</h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField name="count" label="Count" placeholder="Count" />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Creating...' : 'Create'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Epin;
