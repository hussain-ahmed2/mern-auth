import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";
import { User } from "lucide-react";

function AuthButtons() {
	const { user } = useAuth();
	const location = useLocation();

	return (
		<>
			{user && (
				<>
					<li>
						<Link
							className={`link block rounded-full ${
								location.pathname === "/profile"
									? "active-link-btn"
									: ""
							}`}
							to="/profile"
						>
							{user.avatar ? (
								<img
									src={user.avatar}
									alt={user.name}
									className="size-12 object-cover rounded-full"
								/>
							) : (
								<User className="size-12 border-4 rounded-full" />
							)}
						</Link>
					</li>
					<li>
						<LogoutButton />
					</li>
				</>
			)}
		</>
	);
}
export default AuthButtons;
