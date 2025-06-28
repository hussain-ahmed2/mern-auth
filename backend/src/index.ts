import express from "express";
import "dotenv/config";
import Env from "./utils/Env.js";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// create express app
const app = express();

// connect to database
await connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// routes
app.use("/api/auth", authRouter);

// start server
app.listen(Env.PORT, () => {
	console.log(`Server is running on port ${Env.PORT}`);
});
