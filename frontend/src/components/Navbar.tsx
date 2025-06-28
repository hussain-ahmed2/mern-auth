import { Link } from "react-router-dom";
import SiteLogo from "./SiteLogo";
import LoginRegisterButton from "./LoginRegisterButton";
import AuthButtons from "./AuthButtons";

function Navbar() {
	return (
		<nav className="flex items-center justify-between px-5 min-h-20 max-w-7xl mx-auto">
			<Link to="/">
				<SiteLogo />
			</Link>

			<ul className="flex items-center gap-5">
				<LoginRegisterButton />
				<AuthButtons />
			</ul>
		</nav>
	);
}
export default Navbar;
