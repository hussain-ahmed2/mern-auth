import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function RootLayout() {
	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
				<Navbar />
			</header>
			<Outlet />
			<Footer />
		</>
	);
}
export default RootLayout;
