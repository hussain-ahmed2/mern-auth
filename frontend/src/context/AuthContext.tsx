import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "./AuthProvider";

export type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;
