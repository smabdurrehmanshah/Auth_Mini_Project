import { Router } from "express";
import {logout, postLogin, postRegister } from "../controllers/auth_controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/register", upload.single("profileImage"), postRegister);
router.post("/login", postLogin);
router.get("/logout", logout);

export default router;