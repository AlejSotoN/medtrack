import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export function requireRole(roles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Insufficient permissions" });
            return;
        }

        next();
    };
}
