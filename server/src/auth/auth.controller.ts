import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { verifyAdminCredentials, signAdminToken } from "./auth.service";

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = signAdminToken({ role: "admin", id: "admin" });

    res.status(200).json({
      token: "test-token",
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const authMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) { 
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  res.json({
    id: req.user!.sub,
    role: req.user!.role,
  });
};
