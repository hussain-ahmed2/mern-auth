import { Request, Response, NextFunction } from "express";
import User, { UserDocument } from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies?.token;
		if (!token) {
			res.status(401).json({ success: false, message: "No token found" });
			return;
		}
		const decoded = verifyToken(token);

		const user = await User.findById(decoded._id);

		if (!user) {
			res.status(401).json({ success: false, message: "User not found" });
		}

		req.user = user as UserDocument;
		next();
	} catch (err) {
		res.status(401).json({ success: false, message: "Invalid token" });
	}
};
