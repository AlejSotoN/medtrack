import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "medtrack_token";

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

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

