import React from 'react';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useRegistration} from '@/context/RegisterContext';
import {sponserInfoSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {jwtDecode} from 'jwt-decode';
import {useAuthContext} from '@/context/AuthContext';

type FormValues = z.infer<typeof sponserInfoSchema>;
interface SponserInfoProps {
  onNext: () => void;
}

export const SponserInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      sponsorId: user?.user.crnNo,
    },
  });
  const {setSponsorInfo} = useRegistration();

  const onSubmit = (formValues: FormValues) => {
    setSponsorInfo({
      selfSide: formValues.selfSide,
      sponsorId: formValues.sponsorId,
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
            Sponser Info
          </h1>

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
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">Next</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
