import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useRegisterAdmin} from '@/lib/react-query/Admin/Register/register';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {userLoginInfoSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Navigate, useNavigate} from '@tanstack/react-router';
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';

type FormValues = z.infer<typeof userLoginInfoSchema>;

export const LoginInfo: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(userLoginInfoSchema),
  });

  const {user} = useAuthContext();
  const role = user?.user.role;
  const navigate = useNavigate();

  const {setUserLoginInfo, data} = useRegistration();
  const {contactInfo, personalInfo, selectProduct, sponsorInfo, userLoginInfo} =
    data;
  const combinedData = {
    ...contactInfo,
    ...personalInfo,
    ...selectProduct,
    ...sponsorInfo,
    ...userLoginInfo,
  };

  // console.log(combinedData);

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    isError,
  } = useCustomerRegistration();

  const onSubmit = async (formValues: FormValues) => {
    setUserLoginInfo({
      epinNo: formValues.epinNo,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    });
    if (
      userLoginInfo?.epinNo &&
      userLoginInfo?.password &&
      userLoginInfo?.confirmPassword
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await registerAdmin(combinedData as any);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Registered successfully');
      role === 'ADMIN'
        ? navigate({to: '/dashboard'})
        : navigate({to: '/customer/dashboard'});
    }
    if (isError) {
      toast.error('Registration failed');
      console.error('Failed to register');
    }
  }, [setUserLoginInfo, isSuccess, isError]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">Login Info</h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="epinNo"
              label="E-Pin"
              placeholder="Enter E-Pin"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="password"
              label="Password"
              placeholder="Enter Password"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
