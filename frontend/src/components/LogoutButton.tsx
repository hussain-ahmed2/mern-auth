import useAuth from "../hooks/useAuth";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();
	const handleLogout = () => {
		logout().then((success) => {
			if (success) {
				navigate("/login");
				setUser(null);
			}
		});
	};
	return (
		<>
			{user && (
				<button className="btn-danger" onClick={handleLogout}>
					Logout
				</button>
			)}
		</>
	);
}
export default LogoutButton;
