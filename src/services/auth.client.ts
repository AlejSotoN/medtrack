import api from "./api";
import { AuthUser, UserRole } from "./types";

const TOKEN_KEY = "medtrack_token";
const EXP_KEY = "medtrack_token_expires_at";
const USER_KEY = "medtrack_user";

export type LoginResponse = {
  token: string;
  expiresIn: string;
  role: UserRole;
  clinicId: string | null;
  doctorId: string | null;
};

export type RegisterPayload =
  | { accountType: "clinic"; clinicName: string; username: string; email: string; password: string }
  | { accountType: "solo"; firstName: string; lastName: string; email: string; password: string; specialty?: string };

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth", { username, password });
  return response.data;
}

export async function register(payload: RegisterPayload): Promise<{ id: string; accountType: string }> {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXP_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}
