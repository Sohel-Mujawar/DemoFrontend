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
export interface User {
  email: string; // User's email
  exp: number; // Expiration timestamp (usually in seconds since Unix epoch)
  fullname: string; // User's full name
  iat: number; // Issued-at timestamp (when the token was created, in seconds since Unix epoch)
  id: string; // User's unique identifier (likely a string, depending on how it's generated)
  role: string; // User's role (could be 'admin', 'user', etc.)
  username: string;
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
  cell?: (value: unknown) => React.ReactNode;
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
  dob: string; // Ensure ISO format if required
}

// Response type for admin registration
export interface AdminRegistrationResponse {
  message: string;
}

// Response for adminHome
export interface AdminHomeResponse {
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
  crnNo: string;
  epincount: number;
}

// Response for createEPin
export interface CreateEPinResponse {
  message: string;
}

// Response for getAllEPins
export interface GetAllEPinsResponse {
  id: string;
  epinNo: string;
  userId: string;
  createdAt: string;
  status: string; // Example: 'active', 'inactive', 'used', etc.
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
  name: string;
  color?: string;
  details?: string;
  description?: string;
  actualPrice: number;
  discountedPrice: number;
  gstAmount?: number; // Calculated on backend
  images?: string[]; // Array of image URLs
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
