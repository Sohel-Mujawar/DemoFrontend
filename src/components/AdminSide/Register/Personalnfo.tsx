import React from 'react';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {personalInfoSchema} from '@/lib/validation/registerCustomerShema';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useRegistration} from '@/context/RegisterContext';

type FormValues = z.infer<typeof personalInfoSchema>;

interface SponserInfoProps {
  onNext: () => void;
}
export const Personalnfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(personalInfoSchema),
  });

  const {setPersonalInfo} = useRegistration();

  const onSubmit = (formValues: FormValues) => {
    setPersonalInfo({
      aadharNo: formValues.aadharNo,
      panNo: formValues.panNo,
      bankName: formValues.bankName,
      bankAccNo: formValues.bankAccNo,
      bankBranch: formValues.bankBranch,
      bankIFSC: formValues.bankIFSC,
      upiId: formValues.upiId,
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
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">Next</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
