import React, {ReactNode} from 'react';
import {z} from 'zod';

// **Common Interfaces**
export interface ApiResponse<T> {
  statusCode: number;
  status: boolean;
  message: string;
  data: T;
}

export interface PaginationParams {
  token?: string;
  page?: number;
  limit?: number;
  query?: string;
}

export interface IdAndToken {
  id: string;
  token?: string;
}

// **User and Auth Interfaces**
export interface decodedUser {
  id: string;
  email: string;
  phone: string;
  fullname: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER'; // Adjust roles if there are more
  isActive: boolean;
  createdAt: string; // ISO date string
  commissionAmount: number;
  crnNo: string;
}
export interface User {
  role: string;
  user: decodedUser;
  iat: number; // Issued At (timestamp in seconds)
  exp: number; // Expiration (timestamp in seconds)
}

export type UserRole = {
  Role: string;
};

export type Token = {
  accessToken?: string;
  refreshToken?: string;
};

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: Token | null;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// **Pagination Interfaces**
export interface LimitSelectorProps {
  pageOptions?: number[];
  selectedLimit: number;
  onLimitChange: (newLimit: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// **Form Interfaces**
export interface Field<T> {
  label: string;
  name: keyof T;
  type: string;
  placeholder?: string;
  icon?: JSX.Element;
}

export type FormProps<T> = {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  fields: Field<T>[];
  formType: 'create' | 'update';
  buttonText: {submit: string; cancel: string};
  formTitle: string;
};

// **Sidebar Interfaces**
export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

// **Table Interfaces**
export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: T) => React.ReactNode | React.ReactNode;
};

export type TableProps<T> = {
  // Basic Table Setup
  columns: Column<T>[];
  data: T[];
  title: string;
  idKey: keyof T;

  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  pageOptions?: number[];

  // Search
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Pagination and Search Handlers
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  // Actions
  onDetail?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
  isError?: boolean;
};

export interface SearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// **Loader Interfaces**
export interface LoadingErrorNoDataProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  hasData: boolean;
  children: React.ReactNode;
}

export interface ApiError {
  response?: {
    data: {
      message: string;
    };
  };
  message: string;
}

// types/customer.ts

export interface CustomerDetails {
  crnNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  selfSide: string;
  aadharNo: string;
  panNo: string;
  bankName: string;
  bankAccNo: string;
  bankIFSC: string;
  bankBranch: string;
  flatNo: string;
  areaName: string;
  landMark: string;
  pinCode: string;
  city: string;
  state: string;
  upiId: string;
  dob: Date | null;
}

export interface CustomerDetailsResponse {
  customer: CustomerDetails;
  totalReferrals: number;
}

export interface CustomerRegistrationPayload {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  sponsorId: string;
  gender?: string;
  selfSide: string;
  aadharNo?: string;
  panNo?: string;
  bankName?: string;
  bankAccNo?: string;
  bankIFSC?: string;
  bankBranch?: string;
  flatNo?: string;
  areaName?: string;
  landMark?: string;
  upiId?: string;
  pinCode?: string;
  city?: string;
  state?: string;
  dob?: string;
  productId?: string;
  transactionId?: string;
  fullDeliveryAddress?: string;
  epinNo?: string;
}

export interface UserAuthenticationResponse {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      phone: string;
      fullname: string;
      role: string;
    };
    token: Token;
  };
}

// Input type for admin registration
export interface AdminRegistrationInput {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  selfSide: string;
  aadharNo?: string;
  panNo?: string;
  bankName: string;
  bankAccNo: string;
  bankIFSC: string;
  bankBranch: string;
  flatNo: string;
  areaName: string;
  landMark: string;
  upiId?: string;
  pinCode?: string;
  city: string;
  state: string;
  dob: string;
}

// Response type for admin registration
export interface AdminRegistrationResponse {
  message: string;
}

// Response for adminHome
export interface AdminHomeResponse {
  totalIncome: number;
  totalSales: number;
  totalCommission: number;
  totalCustomer: number;
  success: boolean;
  data: {
    totalIncome: number;
    totalSales: number;
    totalCommission: number;
    totalCustomer: number;
    topPerformers: {
      crnNo: string;
      firstName: string;
      lastName: string;
      pairCount: number | null;
    }[];
    newJoinees: {
      crnNo: string;
      firstName: string;
      lastName: string;
      createdAt: string; // ISO date format
    }[];
  };
}

// Response for CustomerList
export interface CustomerListResponse {
  success: boolean;
  data: {
    name: string;
    crnNo: string;
    phone: string;
    email: string;
    password: string; // Stored password
    sponsorId: string | null;
  }[];
}

// Request payload for createEPin
export interface CreateEPinRequest {
  epincount: number;
}

// Response for createEPin
export interface CreateEPinResponse {
  message: string;
}
export interface CreatePurchaseResponse {
  message: string;
}

// Response for getAllEPins
export interface GetAllEPinsResponse {
  id: string;
  epinNo: string;
  assignedToId: string | null;
  createdAt: string; // ISO date format
  isUsed: boolean;
  usedAt: string | null;
  requestId: string;
  usedBy: string | null;
}
[];

// Response for RejectEpinRequest
export interface RejectEpinRequestResponse {
  success: boolean;
  message: string;
}

// Product interface representing the product data
export interface Product {
  id?: string; // Optional for creation
  productType?: string;
  productSubType?: string;
  s3FileKey?: string;
  name: string;
  details?: string | null;
  description?: string | null;
  actualPrice: number;
  discountedPrice: number;
  images?: string | null;
  gstAmount?: number; // Calculated on backend
  commissionRate?: number;
  deliveryCharges?: number;
}

// Response for product-related operations
export interface ProductResponse {
  success: boolean;
  message: string;
  product?: Product; // For single product creation or update
  data?: Product[]; // For fetching multiple products
}

// Customer type
export interface Customer {
  CustomerCommissions: number;
  MyCommission: number;
  count: number;
  lastCustomers: never[];
  topCustomers: never[];
  totalCustomers: number;
  goldIncome: number;
  pendingCommissions: number;
  customer: boolean;
  totalCommission: number;
  totalIncome: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  crnNo: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditEmails {
  email: string;
  crnNo: string;
}

export interface UpdateCustomerData {
  crnNo?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  aadharNo: string;
  panNo: string;
  bankName: string;
  bankAccNo: string;
  bankIFSC: string;
  bankBranch: string;
  flatNo: string;
  areaName: string;
  landMark: string;
  upiId: string;
  pinCode: string;
  city: string;
  state: string;
  dob: string;
  password: string;
}
// Commission type
export interface Commission {
  CutomerCommissions: number;
  MyCommission: number;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer: any;
  lastCustomers: never[];
  topCustomers: never[];
  id: string;
  customerId: string;
  amount: number;
  date: string;
  type: string; // e.g., "bonus", "referral"
}

// Epin Request Payload
export interface EpinRequestPayload {
  type: string; // e.g., "new_epin" or "replacement"
  amount: number;
}

// Epin Response
export interface EpinResponse {
  success: boolean;
  message: string;
  epinId?: string; // Optional, only provided if the E-Pin is created successfully
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  data: {
    uerid: string;
    productId: string;
    paidAmount: number;
    imageFile: string;
  }[];
}
