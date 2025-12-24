import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface JwtPayload {
    role: string;
}
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {  
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader);

    if (!authHeader) {
        res.status(401).json({ 
            message: "Authorization header missing" 
        });
        return;
    };

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).json({ 
            message: "Invalid authorization header format" 
        });
        return;
    }
    const token = parts[1];

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
}


