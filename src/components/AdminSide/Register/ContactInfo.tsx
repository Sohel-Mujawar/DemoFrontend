import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useRegistration} from '@/context/RegisterContext';
import {conatctSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';

type FormValues = z.infer<typeof conatctSchema>;

interface SponserInfoProps {
  onNext: () => void;
}
export const ContactInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(conatctSchema),
  });
  const {setContactInfo} = useRegistration();

  const onSubmit = (formValues: FormValues) => {
    setContactInfo({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phone: formValues.phone,
      email: formValues.email,
      // city: formValues.city,
      // dob: formValues.dob,
      // gender: formValues.gender,
      // flatNo: formValues.flatNo,
      // areaName: formValues.areaName,
      // landMark: formValues.landMark,
      // state: formValues.state,
      // pinCode: formValues.pinCode,
    });
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Contact Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="firstName"
              label="First Name"
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
          {/* <div className="col-span-12 md:col-span-6">
            <GenericInputField type="date" name="dob" label="Date of Birth" />
          </div> */}

          {/* <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="gender"
              label="Gender"
              options={[
                {value: 'MALE', label: 'Male'},
                {value: 'FEMALE', label: 'Female'},
              ]}
            />{' '}
          </div> */}
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
          {/* <div className="col-span-12 md:col-span-6">
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
              placeholder="Enter Area"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="landMark"
              label="Landmark"
              placeholder="Enter Landmark"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="pinCode"
              label="Pincode"
              placeholder="Enter Pin Code"
            />
          </div> */}
          {/* <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="city"
              label="City/Town"
              placeholder="Enter City"
            />
          </div> */}
          {/*
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="state"
              label="State"
              placeholder="Enter State"
            />
          </div> */}
        </div>
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">Next</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
