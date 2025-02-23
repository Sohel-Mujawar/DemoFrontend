/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useNavigate} from '@tanstack/react-router';
import {
  useGetCustomer,
  useGetCustomerById,
} from '@/lib/react-query/Customer/home';
import {useUpdateCustomer} from '@/lib/react-query/updateCustomer';
import {updateCustomerSchema} from '@/lib/validation/updateCustomerSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import Loader from '@/components/common/Loader';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof updateCustomerSchema>;
interface Customer {
  dob: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  // Add any other fields from the customer object here
}

interface Data {
  customer: Customer;
}

const UpdateCustomerProfileU: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
    },
  });
  const {user} = useAuthContext();
  const id = user?.user.id;
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const {
    mutate: updateCustomer,
    isSuccess: updateCustomerSuccess,
    isError,
    isPending,
  } = useUpdateCustomer();

  // ...

  const navigate = useNavigate();

  const {data, isSuccess, isLoading} = useGetCustomerById(id as string);
  // console.log('Get Customer By ID ', data);

  useEffect(() => {
    if (isSuccess && data?.customer && typeof data.customer === 'object') {
      const customer = data.customer as Customer;
      Object.entries(customer).forEach(([key, value]) => {
        methods.setValue(key as keyof FormValues, value as string);
      });

      if (customer.dob && !isNaN(new Date(customer.dob).getTime())) {
        methods.setValue(
          'dob',
          new Date(customer.dob).toISOString().split('T')[0] + 'T00:00:00',
        );
      } else {
        methods.setValue('dob', '');
      }

      setIsDataAvailable(true); // Set data availability flag after the data is updated
    } else {
      setIsDataAvailable(false); // Ensure fields are enabled when data is null
    }
  }, [isSuccess, data, methods]);

  useEffect(() => {
    methods.setValue('phone', user?.user.phone || '');
    methods.setValue('email', user?.user.email || '');
  }, [methods, user]);
  useEffect(() => {
    if (updateCustomerSuccess) {
      toast.success('Customer updated successfully');
      console.log('updateCustomerSuccess', updateCustomerSuccess);
      navigate({to: '/customer/dashboard'});
    }

    if (isError) {
      toast.error('Failed to update customer');
    }
  }, [updateCustomerSuccess, isError, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (FormValues: FormValues) => {
    console.log('FormValues', FormValues);
    if (id !== undefined) {
      updateCustomer({
        id,
        data: {
          crnNo: FormValues.crnNo,
          aadharNo: FormValues.aadharNo || '',
          panNo: FormValues.panNo || '',
          bankName: FormValues.bankName || '',
          bankAccNo: FormValues.bankAccNo || '',
          bankBranch: FormValues.bankBranch || '',
          bankIFSC: FormValues.bankIFSC || '',
          upiId: FormValues.upiId || '',
          firstName: FormValues.firstName,
          lastName: FormValues.lastName,
          dob: FormValues.dob || '',
          gender: FormValues.gender || '',
          phone: FormValues.phone,
          email: FormValues.email,
          flatNo: FormValues.flatNo || '',
          areaName: FormValues.areaName || '',
          landMark: FormValues.landMark || '',
          city: FormValues.city || '',
          state: FormValues.state || '',
          pinCode: FormValues.pinCode || '',
          password: FormValues.password,
        },
      });
    }
    console;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Sponser Infosss
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponser ID"
              placeholder="Enter Sponser ID"
              disabled={isDataAvailable}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="crnNo"
              label="Crn No "
              placeholder="Enter Sponser ID"
              disabled={isDataAvailable}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Contact Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="firstName"
              label="Fist Name"
              placeholder="Enter Client Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="lastName"
              label="Last Name"
              placeholder="Enter Caste"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField type="date" name="dob" label="Date of Birth" />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="gender"
              label="Gender"
              options={[
                {label: 'Male', value: 'MALE'},
                {label: 'Female', value: 'FEMALE'},
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="email"
              label="Email"
              placeholder="Enter Email"
              disabled={isDataAvailable}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="phone"
              label="Mobile "
              placeholder="Enter Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="flatNo"
              label="Flat, House No, Company, Apartment"
              placeholder="Enter Address"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="areaName"
              label="Area, Street, Sector, Village"
              placeholder="Enter Secondary Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="landMark"
              label="Landmark"
              placeholder="Enter Secondary Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="pinCode"
              label="Pincode"
              placeholder="Enter Secondary Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="city"
              label="City/Town"
              placeholder="Enter Secondary Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="state"
              label="State"
              placeholder="Enter Secondary Phone No"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Personal Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="aadharNo"
              label="Adhar Card No"
              placeholder="Enter Adhar No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="panNo"
              label="Pan Card No"
              placeholder="Enter Pan No"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankName"
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankAccNo"
              label="Account Number"
              placeholder="Enter Account No"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankIFSC"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankBranch"
              label="Branch Name"
              placeholder="Enter Branch Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="upiId"
              label="UPI ID"
              placeholder="Enter UPI ID"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">Login Info</h1>

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

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Updating...' : 'Update'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateCustomerProfileU;
