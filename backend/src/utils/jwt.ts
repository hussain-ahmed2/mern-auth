import { Role } from "../models/User.js";
import Env from "./Env.js";
import jwt from "jsonwebtoken";

export type Payload = {
	_id: string;
	role: Role;
};

export const generateToken = (payload: Payload) => {
	return jwt.sign(payload, Env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): Payload => {
	return jwt.verify(token, Env.JWT_SECRET) as Payload;
};
