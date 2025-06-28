import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export type Role = "user" | "admin";

export interface User {
	name: string;
	email: string;
	password: string;
	avatar: string;
	role: Role;
	resetOtp: string | null;
	resetOtpExpiry: Date | null;
}

export interface UserDocument extends User, mongoose.Document {
	matchPassword(password: string): Promise<boolean>;
	generateOtp(): string;
	verifyOtp(otp: string): boolean;
	resetPassword(password: string): void;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		resetOtp: {
			type: String,
			default: null,
		},
		resetOtpExpiry: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook
userSchema.pre<UserDocument>("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

// Instance method
userSchema.methods.matchPassword = async function (
	this: UserDocument,
	password: string
) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateOtp = function (this: UserDocument) {
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	this.resetOtp = otp;
	this.resetOtpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
	return otp;
};

userSchema.methods.verifyOtp = function (this: UserDocument, otp: string) {
	return (
		this.resetOtp === otp &&
		this.resetOtpExpiry &&
		this.resetOtpExpiry > new Date()
	);
};

userSchema.methods.resetPassword = function (
	this: UserDocument,
	password: string
) {
	this.password = password;
	this.resetOtp = null;
	this.resetOtpExpiry = null;
};

const User =
	(mongoose.models.User as mongoose.Model<UserDocument>) ||
	mongoose.model<UserDocument>("User", userSchema);

export default User;
