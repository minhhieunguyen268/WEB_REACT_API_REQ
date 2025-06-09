export interface User {
  id?: number;
  avatar?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  name?: string;  // Optional, to allow undefined
  job?: string;   // Optional, to allow undefined
}

// // Define types for the API responses and parameters
//  interface User {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string;
//   avatar: string;
// }

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}