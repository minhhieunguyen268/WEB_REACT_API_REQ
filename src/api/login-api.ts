import axios from "axios";
import type { AxiosResponse } from "axios";
import type { User, LoginResponse, RegisterResponse, GetUsersResponse } from "../interfaces/interfaces";

const reqresApiUrl = "https://reqres.in/api";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const headers = {
      "x-api-key": "reqres-free-v1",
    };
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${reqresApiUrl}/login`,
      { email, password },
      { headers }
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error login user:", e.message);
    } else {
      console.error("Error login user:", e);
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
  return response;
};

export const updateUser = async (id: number, userData: User): Promise<AxiosResponse<User>> => {
  const headers = {
    "x-api-key": "reqres-free-v1",
  };
  const response: AxiosResponse<User, any> = await axios.put(`${reqresApiUrl}/users/${id}`, userData, {
    headers,
  });
  return response;
};

export const deleteUser = async (id: number): Promise<number> => {
  const headers = {
    "x-api-key": "reqres-free-v1",
  };
  const response: AxiosResponse = await axios.delete(`${reqresApiUrl}/users/${id}`, {
    headers,
  });
  return response.status;
};
