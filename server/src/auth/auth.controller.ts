import { Request, Response } from "express";
import { verifyAdminCredentials, signAdminToken } from "../../services/authService";

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

    const token = signAdminToken({ role: "admin" });

    res.status(200).json({
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
