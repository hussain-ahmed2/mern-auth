import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import useAuth from "../hooks/useAuth";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuth();

	if (user) return <Navigate to="/profile" replace />;

	return children;
};

export default GuestRoute;
