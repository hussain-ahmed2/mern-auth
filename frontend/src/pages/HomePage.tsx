import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HomePage() {
	const { user } = useAuth();
	return (
		<div className="page items-center justify-center">
			<section className="max-w-3xl mx-auto p-5 md:p-8 w-full">
				<h1 className="text-3xl font-bold mb-5 text-center">
					Welcome to MERN Auth
				</h1>
				<p className="mb-5 text-center text-gray-700">
					Please login or register to continue.
				</p>

				<div className="flex items-center justify-center gap-5 mt-5">
					{user ? (
						<Link to="/profile" className="btn-success">
							Profile
						</Link>
					) : (
						<>
							<Link to="/login" className="btn-submit-outline">
								Login
							</Link>
							<Link to="/register" className="btn-submit">
								Register
							</Link>
						</>
					)}
				</div>
			</section>
		</div>
	);
}
export default HomePage;
