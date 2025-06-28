import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import { API } from "../api/axios";
import { setErrors } from "../utils/handleFormErrors";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

function LoginPage() {
	const methods = useForm({ resolver: zodResolver(loginSchema) });
	const navigate = useNavigate();
	const { setUser } = useAuth();

	const onSubmit = async (data: LoginSchema) => {
		try {
			const response = await API.post("/auth/login", data);
			if (response.data.success) {
				navigate("/profile");
				setUser(response.data.user);
				toast.success("Login successful!");
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.data?.errors
			) {
				setErrors(error.response.data.errors, methods.setError);
			} else {
				console.error("An unexpected error occurred:", error);
				toast.error("Something went wrong!");
			}
		}
	};

	return (
		<section className="page items-center justify-center">
			<div className="max-w-3xl mx-auto p-5 md:p-8 w-full">
				<h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
				<p className="mb-5 text-center text-gray-700">
					Please enter your email and password to log in.
				</p>

				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="w-full space-y-3"
					>
						<InputField
							name="email"
							label="Email"
							type="email"
							placeholder="Enter your email"
						/>

						<InputField
							name="password"
							label="Password"
							type="password"
							placeholder="Enter your password"
						/>

						<button
							type="submit"
							className="btn-submit w-full"
							disabled={methods.formState.isSubmitting}
						>
							Login
						</button>
					</form>
				</FormProvider>
				<p className="mt-5 text-center">
					Don&apos;t have an account?{" "}
					<span className="underline">
						<Link to="/register">Register</Link>
					</span>
				</p>
			</div>
		</section>
	);
}
export default LoginPage;
