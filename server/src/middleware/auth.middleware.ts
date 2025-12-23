import { Request, Response, NextFunction } from "express";

interface JwtPayload {
    role: string;
}
  
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {  
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ 
            message: "Authorization header missing" 
        });
        return;
    };

    next();
}


