import mongoose from "mongoose";
import Env from "../utils/Env.js";

const connectDB = async () => {
	try {
		await mongoose.connect(Env.MONGODB_URI);
		console.log("Database connected");
	} catch (error) {
		console.log("Database connection failed", error);
		process.exit(1);
	}
};

export default connectDB;
