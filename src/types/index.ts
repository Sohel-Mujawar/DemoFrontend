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

// **Cateror Interfaces**
export interface Cateror {
  CaterorID: string;
  createdAt: string;
  updatedAt: string;
  Username: string;
  Email: string;
  Name: string;
  Avatar: string | null;
  PhoneNo: string;
}

export interface CaterorUpdateParams {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string | null;
  phoneNo: string;
}

export interface CaterorsResponse {
  caterors: Cateror[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllCaterorsApiResponse = ApiResponse<CaterorsResponse>;

export interface CreateCaterorParams {
  username: string;
  email: string;
  name: string;
  phoneNo: string;
  password: string;
}

// Raw Material Interfaces
export interface CreateRawMaterialCategory {
  Name: string;
  token?: string;
}

export interface RawMaterials {
  RawMaterialID: string;
  RawMaterialName: string;
  RawMaterialCategoryID: string;
  RawMaterialUnit: string;
}

export interface RawMaterialCategoryUpdateParams {
  token?: string;
  id: string;
  Name: string;
}

export interface CreateRawMaterial {
  Name: string;
  CategoryID: string;
  Unit: string;
  token?: string;
}

export interface RawMaterialUpdateParams {
  token?: string;
  id: string;
  Name: string;
  CategoryID: string;
  RawMaterialUnit: string;
}

// Dish Category Interfaces

// export interface CreateDishCategory {
//   Name: string;
//   token?: string;
// }

export interface DishCategoryUpdateParams {
  token?: string;
  id: string;
  Name: string;
}

export interface CreateDish {
  token?: string;
  Name: string;
  CategoryID: string;
  Description: string;
}

export interface CreateDishParams {
  token?: string;
  Name: string;
  CategoryID: string;
  Description?: string;
  DishUnit: number;
  rawMaterials: {
    RawMaterialID: string;
    RawMaterialQuantity: number;
  }[];
}

export interface Dishes {
  DishID: string;
  DishName: string;
  DishDescription: string;
  DishCategoryID: string;
  DishCategoryName: string;
}

export interface DishResponse {
  dishes: Dishes[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllDishApiResponse = ApiResponse<DishResponse>;

// tab typ declaration

type CategoryTypes = {
  name: string;
  accessor: string;
  component: JSX.Element;
};

// tabtype declaration for first array

export interface TabTypes {
  name: string;
  categories: CategoryTypes[];
}

export interface VerticalTabPropsTypes {
  tabData: TabTypes[];
  setJsxElement: (element: React.JSX.Element) => void;
}

// maharaj types declaration

export interface CreateMaharaj {
  token?: string;
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  name: string;
  specialization: string;
  experience: string;
  caterorID: string;
}

export interface UpdateMaharaj {
  id: string;
  token?: string;
  Specialization: string;
  Experience: number;
  isAvailable: boolean;
}

// client type declaration

export interface Clients {
  ClientID: string;
  Username: string;
  Email: string;
  PhoneNo: string;
  Name: string;
  isVeg: boolean;
  isJain: boolean;
  Address: string;
  Caste: string;
}

export interface CreateClient {
  token?: string;
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  caterorID: string;
  name: string;
  isVeg: boolean;
  isJain: boolean;
  Address: string;
  Caste: string;
}

export interface UpdateClient {
  id: string;
  token?: string;
  isVeg: boolean;
  isJain: boolean;
  Address: string;
  Caste: string;
}

export interface ClientResponse {
  clients: Clients[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllClientApiResponse = ApiResponse<ClientResponse>;

// staff type declaration

export interface Staff {
  token?: string;
  StaffID: string;
  Username: string;
  Email: string;
  PhoneNo: string;
  Name: string;
  JobType: string;
  Address: string;
}

export interface CreateStaff {
  token?: string;
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  name: string;
  jobType: string;
  address: string;
  caterorID: string;
}

export interface UpdateStaff {
  id: string;
  token?: string;
  jobType: string;
  address: string;
}

// **Process Interfaces**
export interface Process {
  ProcessID: string;
  ProcessName: string;
  Description: string;
}

export interface ProcessUpdateParams {
  id: string;
  token?: string;
  ProcessName: string;
  Description: string;
}

export interface ProcessesResponse {
  processes: Process[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllProcessesApiResponse = ApiResponse<ProcessesResponse>;

export interface CreateProcessParams {
  token?: string;
  ProcessName: string;
  Description: string;
}

// **Utensil Category Interfaces**
export interface UtensilCategory {
  UtensilCategoryID: string;
  CategoryName: string;
}

export interface UtensilCategoryUpdateParams {
  UtensilCategoryID: string;
  token?: string;
  CategoryName: string;
}

export interface UtensilCategoriesResponse {
  utensilCategories: UtensilCategory[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllUtensilCategoriesApiResponse =
  ApiResponse<UtensilCategoriesResponse>;

export interface CreateUtensilCategoryParams {
  token?: string;
  CategoryName: string;
}

// **Utensil Interfaces**
export interface Utensil {
  UtensilId: string;
  UtensilName: string;
  CategoryName: string;
  UtensilCategoryID: string;
}

export interface UtensilUpdateParams {
  id: string;
  token?: string;
  UtensilName: string;
  UtensilCategoryId: string;
}

export interface UtensilsResponse {
  DishID: string;
  utensils: Utensil[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllUtensilsApiResponse = ApiResponse<UtensilsResponse>;

export interface CreateUtensilParams {
  UtensilName: string;
  UtensilCategoryID: string;
}

// **Disposal Category Interfaces**
export interface DisposalCategory {
  id: string;
  CategoryName: string;
}

export interface DisposalCategoryUpdateParams {
  id: string;
  token?: string;
  CategoryName: string;
}

export interface DisposalCategoriesResponse {
  disposalCategories: DisposalCategory[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllDisposalCategoriesApiResponse =
  ApiResponse<DisposalCategoriesResponse>;

export interface CreateDisposalCategoryParams {
  token?: string;
  CategoryName: string;
}

// **Disposal Interfaces**
export interface Disposal {
  id: string;
  DisposalName: string;
  CategoryName: string;
  DisposalCategoryId?: string;
}

export interface DisposalUpdateParams {
  id: string;
  token?: string;
  DisposalName: string;
  DisposalCategoryId: string;
}

export interface DisposalsResponse {
  disposals: Disposal[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllDisposalsApiResponse = ApiResponse<DisposalsResponse>;

export interface CreateDisposalParams {
  token?: string;
  DisposalName: string;
  DisposalCategoryId: string;
}

// event disposal interface

export interface CreateEventDisposal {
  token?: string;
  EventID: string;
  DisposalID: string;
  takenQuantity: number;
  // returnedQuantity: number;
}

export interface EventDisposal {
  EventID: string;
  DisposalID: string;
  takenQuantity: number;
  returnedQuantity: number;
}

export interface EventDisposalParams {
  token?: string;
  eventId: string;
  disposalId: string;
}

export interface UpdateEventDisposal {
  token?: string;
  takenQuantity: number;
  returnedQuantity: number;
}

export interface EventDisposalResponse {
  eventDisposals: EventDisposal[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllEventDisposalApiResponse = ApiResponse<EventDisposalResponse>;

// event utensil interface types

export interface CreateEventUtensil {
  token?: string;
  EventID: string;
  UtensilID: string;
  takenQuantity: number;
  returnedQuantity: number;
}

export interface EventUtensil {
  EventID: string;
  UtensilID: string;
  takenQuantity: number;
  returnedQuantity: number;
}

export interface EventUtensilParams {
  token?: string;
  eventId: string;
  utensilId: string;
}

export interface UpdateEventUtensil {
  token?: string;
  takenQuantity: number;
  returnedQuantity: number;
}

export interface EventUtensilResponse {
  eventUtensils: EventUtensil[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllEventUtensilApiResponse = ApiResponse<EventUtensilResponse>;

// subscription interface types

export interface CreateSubscription {
  token?: string;
  CaterorID: string;
  Price: number;
  TimePeriod: string;
  ReceivedAmount: number;
  startDate: string;
  nextYearRenewalFees: number;
}

export interface Subscription {
  Price: number;
  TimePeriod: string;
  ReceivedAmount: number;
  RemainingAmount: number;
  startDate: string;
  endDate: string;
  nextYearRenewalFees: number;
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type SubscriptionUpdateParams = CreateSubscription & IdAndToken;

export type GetAllSubscriptionApiResponse = ApiResponse<SubscriptionsResponse>;

export interface CaterorDish {
  DishID: string;
  DishName: string;
  DishCategoryID: string;
}

export type CreateCaterorDish = {
  DishName: string;
  DishCategoryID: string;
  CaterorID: string;
};

export type UpdateCaterorDishParams = CreateCaterorDish;

export interface CaterorDishResponse {
  caterorDishes: CaterorDish[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllCaterorDishResponse = ApiResponse<CaterorDishResponse>;

// cateror dish raw material

export interface CaterorDishRawMaterial {
  DishID: string;
  RawMaterialID: string;
  CaterorID: string;
  PeopleCount: number;
  Quantity: number;
  UnitPrices: number;
}

export type CreateCaterorDishRawMaterial = CaterorDishRawMaterial & {
  token?: string;
};

export type CaterorDishRawMaterialParams = Omit<
  CaterorDishRawMaterial,
  'PeopleCount' | 'Quantity' | 'UnitPrices'
>;

export type UpdateCaterorDishRawMaterial = CaterorDishRawMaterial;

export interface CaterorDishRawMaterialResponse {
  CaterorDishRawMaterial: CaterorDishRawMaterial[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllCaterorDishRawMaterialResponse =
  ApiResponse<CaterorDishRawMaterialResponse>;

// create dish

export interface CreateDish {
  DishName: string;
  DishCategoryID: string;
  DishDescription: string;
}

// raw Material

export interface RawMaterial {
  RawMaterialID: string;
  RawMaterialName: string;
  RawMaterialUnit: 'LITRE' | 'GRAM' | 'KILOGRAM' | 'BOTTLE' | 'METER';
  ProcessID: string;
}

export interface RawMaterialParams extends RawMaterial {
  token?: string;
}

export interface RawMaterialResponse {
  rawMaterials: RawMaterial[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllRawMaterialResponse = ApiResponse<RawMaterialResponse>;

// Dish Category

export interface DishCategory {
  DishCategoryID: string;
  CategoryName: string;
}

export interface CreateDishCategory {
  token?: string;
  CategoryName: string;
}

export interface DishCategoryParams extends DishCategory {
  token?: string;
}

export interface DishCategoriesResponse {
  dishCategories: DishCategory[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type GetAllDishCategories = ApiResponse<DishCategoriesResponse>;

// raw materials in the dish

export interface CreateDishRawMaterial
  extends Omit<CaterorDishRawMaterial, 'CaterorID'> {
  token?: string;
}

export interface PredictRawMaterialQuantity
  extends Omit<
    CaterorDishRawMaterial,
    'Quantity' | 'number' | 'UnitPrices' | 'CaterorID'
  > {
  token?: string;
}

export interface UpdateDishRawMaterialParams extends CreateDishRawMaterial {}

export interface DishRawMaterialParams {
  token?: string;
  DishID: string;
  RawMaterialID: string;
}

export interface GetDishRawMaterialsParams {
  DishID: string;
}

// transaction types

export interface Transaction {
  ClientID: string;
  CaterorID: string;
  Description: string;
  Amount: number;
  Type: 'Income' | 'Expense' | 'Receivable' | 'Payable';
}

export type TransactionParams = Omit<Transaction, 'Amount' | 'Description'>;
