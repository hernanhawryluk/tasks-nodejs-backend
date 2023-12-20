import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller";
import authenticate from "../middlewares/auth.middlewares";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authenticate, profile);

export default router;
