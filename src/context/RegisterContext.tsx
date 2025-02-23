import React, {createContext, useContext, useState} from 'react';
import {z} from 'zod';

// Import your schemas
import {
  userLoginInfoSchema,
  sponserInfoSchema,
  selectProductSchema,
  conatctSchema,
  personalInfoSchema,
} from '@/lib/validation/registerCustomerShema';

// Define types for form data
type UserLoginInfo = z.infer<typeof userLoginInfoSchema>;
type SponsorInfo = z.infer<typeof sponserInfoSchema>;
type SelectProduct = z.infer<typeof selectProductSchema>;
type ContactInfo = z.infer<typeof conatctSchema>;
type PersonalInfo = z.infer<typeof personalInfoSchema>;

interface RegistrationData {
  userLoginInfo?: UserLoginInfo;
  sponsorInfo?: SponsorInfo;
  selectProduct?: SelectProduct;
  contactInfo?: ContactInfo;
  personalInfo?: PersonalInfo;
}

interface RegistrationContextProps {
  data: RegistrationData;
  setUserLoginInfo: (info: UserLoginInfo) => void;
  setSponsorInfo: (info: SponsorInfo) => void;
  setSelectProduct: (info: SelectProduct) => void;
  setContactInfo: (info: ContactInfo) => void;
  setPersonalInfo: (info: PersonalInfo) => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined,
);

export const RegistrationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [data, setData] = useState<RegistrationData>({});

  const setUserLoginInfo = (info: UserLoginInfo) => {
    setData((prev) => ({...prev, userLoginInfo: info}));
  };

  const setSponsorInfo = (info: SponsorInfo) => {
    setData((prev) => ({...prev, sponsorInfo: info}));
  };

  const setSelectProduct = (info: SelectProduct) => {
    setData((prev) => ({...prev, selectProduct: info}));
  };

  const setContactInfo = (info: ContactInfo) => {
    setData((prev) => ({...prev, contactInfo: info}));
  };

  const setPersonalInfo = (info: PersonalInfo) => {
    setData((prev) => ({...prev, personalInfo: info}));
  };

  return (
    <RegistrationContext.Provider
      value={{
        data,
        setUserLoginInfo,
        setSponsorInfo,
        setSelectProduct,
        setContactInfo,
        setPersonalInfo,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// Hook for using context
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      'useRegistration must be used within a RegistrationProvider',
    );
  }
  return context;
};
