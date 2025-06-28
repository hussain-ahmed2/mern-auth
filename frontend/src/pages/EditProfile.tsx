import { FormProvider, useForm } from "react-hook-form";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import AvatarInput from "../components/AvatarInput";
import {
	editProfileSchema,
	type EditProfileSchema,
} from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../api/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { setErrors } from "../utils/handleFormErrors";

function EditProfile() {
	const { user, setUser } = useAuth();
	const methods = useForm({
		defaultValues: { ...user },
		resolver: zodResolver(editProfileSchema),
	});
	const navigate = useNavigate();

	const onSubmit = async (data: EditProfileSchema) => {
		if (
			data.avatar === user?.avatar &&
			data.email === user?.email &&
			data.name === user?.name &&
			!data.currentPassword &&
			!data.newPassword
		) {
			console.log(data);
			toast.error("No changes detected!");
			return;
		}
		try {
			const res = await API.put("/auth/profile", data);
			setUser(res.data.user);
			toast.success("Profile updated successfully!");
			navigate("/profile");
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.data?.errors
			) {
				setErrors(error.response.data.errors, methods.setError);
			}
		}
	};

	return (
		<div className="page">
			<h1 className="text-3xl font-bold mb-5">Edit Profile</h1>

			<div>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						<div className="flex items-center w-full">
							<AvatarInput user={{ ...user }} name="avatar" />
						</div>

						<InputField name="name" label="Name" />
						<InputField name="email" label="Email" />

						<div className="flex flex-col gap-3 mt-5">
							<h3 className="text-lg font-semibold">
								Change Password (Only fill if you want to
								change):
							</h3>
							<InputField
								name="currentPassword"
								label="Password"
								type="password"
								placeholder="Enter your current password"
							/>

							<InputField
								name="newPassword"
								label="New Password"
								type="password"
								placeholder="Enter your new password"
							/>
						</div>

						<div className="mt-3 flex items-center justify-end gap-3">
							<button className="btn-submit" type="submit">
								Save
							</button>
							<Link to="/profile" className="btn-warning">
								Cancel
							</Link>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
export default EditProfile;
