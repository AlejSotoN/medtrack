import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type LoginResponse = {
  token: string;
  expiresIn: string;
};

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    {
      username,
      password,
    }
  );

  return response.data;
}
