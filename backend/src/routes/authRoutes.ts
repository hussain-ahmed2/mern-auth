import express from "express";
import {
	getMe,
	login,
	register,
	logout,
	sendOTP,
	resetPassword,
	updateProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/register", register);

router.get("/profile", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);

router.post("/send-otp", authMiddleware, sendOTP);
router.post("/reset-password", authMiddleware, resetPassword);

export default router;
