import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type LoginResult = {
    token: string;
    expiresIn: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
        throw new Error('Admin credentials are not set in environment variables.');
    }

    if (username !== adminUsername) return false;

    return await bcrypt.compare(password, adminPassword);
}

export function signAdminToken(payload: {role: "admin"}) {

  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn});
}