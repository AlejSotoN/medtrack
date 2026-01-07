import api from "./api";

const TOKEN_KEY = "medtrack_token";
const EXP_KEY = "medtrack_token_expires_at";

export type LoginResponse = {
  token: string;
  expiresIn: string;
};

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    `/auth/login`,
    {
      username,
      password,
    }
  );

  return response.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXP_KEY);
}
