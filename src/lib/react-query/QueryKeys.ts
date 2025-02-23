export enum QUERY_KEYS {
  TOKEN = 'token',
}
// Admin Query Keys

export const ADMIN_AUTH_QUERY_KEYS = {
  REGISTER: 'register-admin',
};

export const ADMIN_EPIN_QUERY_KEYS = {
  CREATE_EPIN: 'create-epin',
  GET_ALL_EPINS: 'get-all-epins',
  GET_ALL_EPIN_REQUESTS: 'get-all-epin-requests',
  REJECT_EPIN: 'reject-epin',
  CUSTOMERS_EPINS: 'customer-epins',
  GET_EPIN_HISTORY: 'get-epin-history',
};

export const ADMIN_DASHBOARD_QUERY_KEYS = {
  ADMIN_HOME: 'admin-home',
  CUSTOMER_LIST: 'customer-list',
  ADMIN_COMMISSION: 'admin-commission',
  PRODUCT_SALES_REPORT: 'product-sales-report',
};

export const ADMIN_PRODUCT_QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
};

// customer Query Keys

export const CUSTOMER_QUERY_KEYS = {
  CUSTOMER: 'customer',
  COMMISSION: 'commission',
  EPINS: 'epins',
  EPIN_REQUESTS: 'epinRequests',
};

export const CUSTOMER_BANNERS_QUERY_KEYS = {
  BANNERS: 'banners',
  BANNER: 'banner',
};

export const NETWORK_QUERY_KEYS = {
  NETWORK: 'network',
};

export const ADMIN_BANNERS_QUERY_KEYS = {
  BANNERS: 'banners',
  BANNER: 'banner',
};
