import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import GenericButton from '../Forms/Buttons/GenericButton';
import GenericInputField from '../Forms/Input/GenericInputField';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useNavigate} from '@tanstack/react-router';
import {useUpdateCustomerEmail} from '@/lib/react-query/updateCustomer';
import {emailChangeSchema} from '@/lib/validation/emailChange';
import GenericTable, {Column} from '../Forms/Table/GenericTable';
import {useFetchCustomerList} from '@/lib/react-query/Admin/Home/adminHome';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof emailChangeSchema>;
type CustomerData = {
  name: string;
  crnNo: string;
  phone: string;
  email: string;
  sponsorId: string;
  password: string;
};

const EmailChange: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [selectedUser, setSelectedUser] = useState<CustomerData | null>(null);
  const [isEditing, setIsEditing] = useState(false); // New state to toggle between table and form view
  const navigate = useNavigate();
  const columns: Column<CustomerData>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Customer ID', accessor: 'crnNo'},
    {header: 'Mobile No', accessor: 'phone'},
    {header: 'Email', accessor: 'email'},
    {header: 'Sponsor ID', accessor: 'sponsorId'},
    {header: 'Password', accessor: 'password'},
  ];

  const {
    mutate: updateCustomer,
    isSuccess,
    isPending,
    error,
  } = useUpdateCustomerEmail();
  const {data: apiData, refetch: refetchCustomerList} = useFetchCustomerList();

  // After successfully updating the email, you can refetch the data
  refetchCustomerList();

  const methods = useForm<FormValues>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      email: '',
      crnNo: '',
    },
  });

  const handleEdit = (item: CustomerData) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setSelectedUser(item);
    setIsEditing(true); // Switch to edit form view
    methods.reset({
      email: item.email,
      crnNo: item.crnNo,
    });
  };

  useEffect(() => {
    if (apiData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = apiData?.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        crnNo: customer.crnNo,
        phone: customer.phone,
        email: customer.email,
        sponsorId: customer.sponsorId,
        password: customer.password,
        action: 'Edit/Delete',
      }));
      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);
    }
  }, [apiData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email updated successfully');
      setIsEditing(false); // Switch back to table view after success
      methods.reset({
        email: '',
        crnNo: '',
      });
    }
    if (error) {
      toast.error('Error updating email');
    }
  }, [isSuccess, error]);

  const onSubmit = (formValues: FormValues) => {
    updateCustomer({
      data: {
        crnNo: formValues.crnNo,
        email: formValues.email,
      },
    });
  };

  return (
    <div>
      {/* Conditional rendering based on isEditing state */}
      {isEditing ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8 bg-white p-8 dark:bg-black"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
              <h1 className="col-span-12 mb-4 text-lg font-semibold">
                Email Change
              </h1>
              <div className="col-span-12 md:col-span-6">
                <GenericInputField
                  name="email"
                  label="Current Email"
                  placeholder="Current Email"
                  disabled
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <GenericInputField
                  name="email"
                  label="Change Email"
                  placeholder="Enter New Email"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <GenericInputField
                  name="crnNo"
                  label="Crn No"
                  placeholder="Crn No"
                  disabled
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
      ) : (
        // Display the table if not in editing mode
        <GenericTable
          title="Customer List For Change Email"
          data={customerData}
          columns={columns}
          itemsPerPage={15}
          searchAble
          onEdit={handleEdit} // Pass handleEdit to GenericTable
        />
      )}
    </div>
  );
};

export default EmailChange;
