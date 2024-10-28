// src/constants.js

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// User Endpoints
export const USER_REGISTER_URL = `${API_BASE_URL}/users/register`;
export const USER_LOGIN_URL = `${API_BASE_URL}/users/login`;
export const USER_PROFILE_URL = `${API_BASE_URL}/users/profile`;
export const USER_ORDERS_URL = `${API_BASE_URL}/users/orders`;
export const USER_CART_URL = `${API_BASE_URL}/users/cart`;
export const USER_CHECKOUT_URL = `${API_BASE_URL}/users/checkout`;

// Admin Endpoints
export const ADMIN_REGISTER_URL = `${API_BASE_URL}/admin/register`;
export const ADMIN_LOGIN_URL = `${API_BASE_URL}/admin/login`;
export const ADMIN_USERS_URL = `${API_BASE_URL}/admin/users`;
export const ADMIN_PRODUCTS_URL = `${API_BASE_URL}/admin/products`;
export const ADMIN_ORDERS_URL = `${API_BASE_URL}/admin/orders`;
