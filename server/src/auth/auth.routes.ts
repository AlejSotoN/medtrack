import express from "express";
import { authMe, login } from "../auth/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", login);
router.get("/me", requireAuth, authMe);

export default router;
