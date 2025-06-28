import { RequestHandler } from "express";
import {
	editProfileSchema,
	registerSchema,
	resetPasswordSchema,
} from "../schemas/authSchema.js";
import { formatZodError } from "../utils/zodErrors.js";
import User, { UserDocument } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const login: RequestHandler = async (req, res) => {
	const { email, password } = req.body;
	const user: UserDocument | null = await User.findOne({ email });

	// If user doesn't exist, return 401
	if (!user) {
		res.status(401).json({
			success: false,
			message: "Invalid credentials",
			errors: { email: "Email is not registered" },
		});
		return;
	}

	// Check if password matches
	const passwordMatch = await user.matchPassword(password);
	if (!passwordMatch) {
		res.status(403).json({
			success: false,
			message: "Invalid credentials",
			errors: { password: "Password is incorrect" },
		});
		return;
	}

	// Generate JWT token and set cookie
	const token = generateToken({ _id: user._id as string, role: user.role });
	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 1000 * 60 * 60 * 24, // 1 day
	});

	// Return user data
	res.json({
		success: true,
		message: "Logged in successfully",
		user: {
			name: user.name,
			email: user.email,
			role: user.role,
			avatar: user.avatar,
		},
	});
};

export const register: RequestHandler = async (req, res) => {
	try {
		const { name, email, password, avatar } = req.body || {};
		const { success, data, error } = registerSchema.safeParse({
			name,
			email,
			password,
			avatar,
		});

		// If validation fails, return 400
		if (!success) {
			res.status(400).json({
				success: false,
				message: "Validation error",
				errors: formatZodError(error),
			});
			return;
		}

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).json({
				success: false,
				message: "User already exists",
				errors: { email: "User already exists" },
			});
			return;
		}
		// Create user
		const user: UserDocument = await User.create({
			name,
			email,
			password,
			avatar,
		});

		// Generate JWT token and set cookie
		const token = generateToken({
			_id: user._id as string,
			role: user.role,
		});

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		// Return user data
		res.status(201).json({
			success: true,
			message: "Registered successfully",
			user: {
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				role: user.role,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

export const logout: RequestHandler = (req, res) => {
	res.clearCookie("token").json({
		success: true,
		message: "Logged out successfully",
	});
};

export const getMe: RequestHandler = async (req, res) => {
	try {
		const user = req.user!;

		res.json({
			success: true,
			user: {
				name: user.name,
				email: user.email,
				role: user.role,
				avatar: user.avatar,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

export const sendOTP: RequestHandler = async (req, res) => {
	try {
		const user = req.user!;

		const otp = user.generateOtp();

		res.json({
			success: true,
			message: "OTP sent successfully to your email",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

export const verifyOTP: RequestHandler = async (req, res) => {
	try {
		const user = req.user!;

		const { otp } = req.body;

		if (!user.verifyOtp(otp)) {
			res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
			return;
		}

		res.json({
			success: true,
			message: "OTP verified successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

export const resetPassword: RequestHandler = async (req, res) => {
	try {
		const user = req.user!;
		const { password } = req.body;

		const { success, error, data } = resetPasswordSchema.safeParse({
			password,
		});

		if (!success) {
			res.status(400).json({
				success: false,
				message: "Invalid request",
				errors: formatZodError(error),
			});
			return;
		}

		user.resetPassword(data.password);

		res.json({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

export const updateProfile: RequestHandler = async (req, res) => {
	try {
		const user = req.user!;
		const { name, email, avatar, currentPassword, newPassword } = req.body;

		const { success, error, data } = editProfileSchema.safeParse({
			name,
			email,
			avatar,
			currentPassword,
			newPassword,
		});

		if (!success) {
			res.status(400).json({
				success: false,
				message: "Validation error",
				errors: formatZodError(error),
			});
			return;
		}

		if (
			user.name === data.name &&
			user.email === data.email &&
			user.avatar === data.avatar &&
			!data.currentPassword &&
			!data.newPassword
		) {
			res.status(400).json({
				success: false,
				message: "No changes made",
			});
			return;
		}

		if (data.currentPassword && data.newPassword) {
			const isPwdMatched = await user.matchPassword(currentPassword);

			if (!isPwdMatched) {
				res.status(400).json({
					success: false,
					message: "Current password is incorrect",
					errors: {
						currentPassword: "Current password is incorrect",
					},
				});
				return;
			}

			user.password = data.newPassword;
		}

		user.name = data.name;
		user.email = data.email;

		if (data.avatar) {
			user.avatar = data.avatar;
		}

		await user.save();

		res.json({
			success: true,
			message: "Profile updated successfully",
			user: {
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				role: user.role,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};
