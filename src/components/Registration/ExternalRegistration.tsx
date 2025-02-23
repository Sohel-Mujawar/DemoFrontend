/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {userLoginInfoSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Navigate, useMatch, useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';
import GenericSearchDropdown from '../Forms/SearchDropDown/GenericSearchDropdown';
import {externalRegistrationSchema} from '@/lib/validation/externalRegistratioinSchema';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';

type FormValues = z.infer<typeof externalRegistrationSchema>;

export const ExternalRegistration: React.FC = () => {
  const {params} = useMatch('/_registration/register/$name/$crnno' as any) as {
    params: {crnno: string; name: string};
  };

  // console.log(params);
  const methods = useForm<FormValues>({
    resolver: zodResolver(externalRegistrationSchema),
    defaultValues: {
      sponsorId: params.crnno,
    },
  });
  const {setSelectProduct} = useRegistration();

  const {data} = useGetAllProducts();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const {user} = useAuthContext();

  const role = user?.user.role;
  const navigate = useNavigate();

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    isError,
  } = useCustomerRegistration();

  const onSubmit = (formValues: FormValues) => {
    // console.log(' formValues ', formValues, selectedProductId);

    registerAdmin({
      firstName: formValues.firstName || '',
      lastName: formValues.lastName || '',
      phone: formValues.phone || '',
      email: formValues.email || '',
      epinNo: formValues.epinNo || '',
      password: formValues.password || '',
      selfSide: formValues.selfSide,
      sponsorId: formValues.sponsorId,
      productId: selectedProductId || '',
    });
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
  }, [isSuccess, isError]);

  const handleCardSelect = (productId: string) => {
    // console.log('Selected Product ID:', productId);
    setSelectedProductId(productId);
    setSelectProduct({productId});
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Sponsor Info
          </h1>
          <p className="col-span-12 text-lg font-semibold">
            Name: &nbsp;{params.name.replace('_', ' ')}
          </p>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponser ID"
              placeholder="Enter Sponser ID"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="selfSide"
              label="self side"
              options={[
                {value: 'LEFT', label: 'Left'},
                {value: 'RIGHT', label: 'Right'},
              ]}
            />
          </div>
        </div>

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
                  className="mb-4 w-full rounded-lg object-cover"
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Contact Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="firstName"
              label="Fist Name"
              placeholder="Enter First Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="email"
              label="Email"
              placeholder="Enter Email"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="phone"
              label="Mobile "
              placeholder="Enter Phone No"
            />
          </div>
        </div>

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
