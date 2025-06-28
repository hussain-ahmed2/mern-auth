import { User } from "lucide-react";
import LogoutButton from "../components/LogoutButton";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function ProfilePage() {
	const { user } = useAuth();
	return (
		<section className="page">
			<div>
				<h1 className="text-3xl font-bold mb-5">Profile</h1>
				<div className="flex flex-col md:flex-row justify-between gap-5">
					<p className="text-lg text-gray-800">
						Welcome,{" "}
						<span className="font-semibold">{user?.name}</span>! You
						are logged in as{" "}
						<span className="font-medium">{user?.email}</span>.
					</p>

					<LogoutButton />
				</div>

				<div>
					<h2 className="text-2xl font-bold mt-10 mb-5">
						Your Details
					</h2>
					<div className="space-y-3 text-gray-800">
						<div>
							{user?.avatar ? (
								<img
									src={user.avatar}
									alt={user.name}
									className="size-32 object-cover rounded-full"
								/>
							) : (
								<User className="w-16 h-16 rounded-full border-4" />
							)}
						</div>
						<div>
							<p className="text-lg">
								Name:{" "}
								<span className="font-semibold">
									{user?.name}
								</span>
							</p>
							<p className="text-lg text-gray-800">
								Email:{" "}
								<span className="font-semibold">
									{user?.email}
								</span>
							</p>
						</div>
					</div>

					<div className="mt-5">
						<Link to="/profile/edit-profile" className="btn-info">
							Edit Profile
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
export default ProfilePage;
