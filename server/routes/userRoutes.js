import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controllers/user_controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAuthenticated, getAllUsers);
router.get("/me", isAuthenticated, getCurrentUser);

export default router;
