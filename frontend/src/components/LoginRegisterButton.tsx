import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginRegisterButton() {
	const { user } = useAuth();
	const location = useLocation();

	return (
		<>
			{!user && (
				<>
					<li>
						<Link
							className={`btn-ghost-outline ${
								location.pathname === "/login"
									? "active-link-btn"
									: ""
							}`}
							to="/login"
						>
							Login
						</Link>
					</li>
					<li>
						<Link
							className={`btn-ghost ${
								location.pathname === "/register"
									? "active-link-btn"
									: ""
							}`}
							to="/register"
						>
							Register
						</Link>
					</li>
				</>
			)}
		</>
	);
}
export default LoginRegisterButton;
