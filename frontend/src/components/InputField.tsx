import type { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
	name: string;
	label: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
}

function InputField({
	name,
	label,
	type = "text",
	placeholder = "Type here",
}: InputFieldProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const error = errors[name];
	return (
		<div className="flex flex-col gap-1">
			<label className="font-medium" htmlFor={label}>
				{label}
			</label>
			<input
				className={`border bg-white rounded-md p-3 outline-none focus:ring-3 transition duration-300 ${
					error
						? "border-rose-300 ring-rose-500/50"
						: "border-gray-300 ring-gray-500/50"
				}`}
				type={type}
				id={name}
				placeholder={placeholder}
				{...register(name)}
			/>
			<div className="overflow-hidden">
				<p
					className={`text-rose-500 text-sm transition-all duration-300 ${
						error ? "" : "h-0 opacity-0 translate-x-full"
					}`}
				>
					{error?.message?.toString()}
				</p>
			</div>
		</div>
	);
}
export default InputField;
