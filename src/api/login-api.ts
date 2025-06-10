import axios from "axios";
import type { AxiosResponse } from "axios";
import type { User, LoginResponse, RegisterResponse, GetUsersResponse } from "../interfaces/interfaces";

const reqresApiUrl = "https://reqres.in/api";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log(email);
    const headers = {
      "x-api-key": "reqres-free-v1",
    };
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${reqresApiUrl}/login`,
      { email, password },
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error:", e);
    }
    throw e;
  }
};

export const register = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const headers = {
      "x-api-key": "reqres-free-v1",
    };
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${reqresApiUrl}/register`,
      { email, password },
      { headers }
    );
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error registering user:", e.message);
    } else {
      console.error("Error registering user:", e);
    }
    throw e;
  }
};

export const getUsers = async (page = 2): Promise<GetUsersResponse> => {
  try {
    const response: AxiosResponse<GetUsersResponse> = await axios.get(`${reqresApiUrl}/users`, {
      params: { page },
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    console.log("Users data fetched successfully:", response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error fetching users:", e.message);
    } else {
      console.error("Error fetching users:", e);
    }
    throw e;
  }
};

export const createUser = async (userData: User): Promise<AxiosResponse<User>> => {
  const headers = {
    "x-api-key": "reqres-free-v1",
  };
  const response: AxiosResponse<User> = await axios.post(`${reqresApiUrl}/users`, userData, {
    headers,
  });
  console.log("User data added successfully:", response.data);
  return response;
};

export const updateUser = async (id: number, userData: User): Promise<AxiosResponse<User>> => {
  const headers = {
    "x-api-key": "reqres-free-v1",
  };
  const response: AxiosResponse<User, any> = await axios.put(`${reqresApiUrl}/users/${id}`, userData, {
    headers,
  });
  console.log(`URL ${reqresApiUrl}/users/${id}`);
  console.log("User updated successfully:", response.data);
  return response;
};

export const deleteUser = async (id: number): Promise<number> => {
  const headers = {
    "x-api-key": "reqres-free-v1",
  };
  const response: AxiosResponse = await axios.delete(`${reqresApiUrl}/users/${id}`, {
    headers,
  });
  console.log(`User ${id} deleted successfully, status: ${response.status}`);
  return response.status;
};
