import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type LoginResult = {
    token: string;
    expiresIn: string;
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
        throw new Error('Admin credentials are not set in environment variables.');
    }

    if (username !== adminUsername) return false;

    if (adminPassword.startsWith('$2')) {
        return await bcrypt.compare(password, adminPassword);
      } else {
        return password === adminPassword;
      }
}

export function signAdminToken(payload: object) {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) throw new Error("JWT_SECRET is missing");

  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, secret, { expiresIn: expiresIn});
}