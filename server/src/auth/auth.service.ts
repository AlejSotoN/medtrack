import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import dotenv from "dotenv";

dotenv.config();

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  console.log("ADMIN_USER:", !!process.env.ADMIN_USERNAME);
  console.log("ADMIN_PASS:", !!process.env.ADMIN_PASSWORD);

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error("Admin credentials are not set in environment variables.");
  }

  if (username !== adminUsername) return false;

  return bcrypt.compare(password, adminPassword);
}

export function signAdminToken(payload: object): string {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const secret: Secret = jwtSecret;

  const expiresIn =
    (process.env.JWT_EXPIRES_IN as StringValue | undefined) ?? "1h";

  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
}
