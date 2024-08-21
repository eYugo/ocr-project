import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface LoginResponse {
  status: string;
  message: string;
  result: {
    token: string;
  };
}

interface RegisterResponse {
  status: string;
  message: string;
  result: {
    token: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};
