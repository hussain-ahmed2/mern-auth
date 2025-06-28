import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { fetchUser } from "../utils/auth";

export type User = {
	_id: string;
	name: string;
	email: string;
	role: "user" | "admin";
	avatar: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchUser().then((user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
};

export default AuthProvider;
