import { useFormContext } from "react-hook-form";
import { User, ImagePlus } from "lucide-react";

function AvatarInput({
	user,
	name,
}: {
	user?: { avatar?: string; name?: string };
	name: string;
}) {
	const { watch, setValue } = useFormContext();
	const avatar = watch(name);

	const displayImage = avatar || user?.avatar;

	return (
		<>
			<label className="flex flex-col w-full" htmlFor={name}>
				<p className="mb-3">
					<span className="font-medium">Avatar:</span>&nbsp;
					<span className="text-sm text-gray-500">
						(Only fill if you want to change)
					</span>
				</p>
				<div className="w-fit mx-auto cursor-pointer group relative">
					<div className="group-hover:opacity-50 transition duration-300">
						{displayImage ? (
							<img
								src={displayImage}
								alt={user?.name}
								className="w-32 h-32 object-cover rounded-full"
							/>
						) : (
							<User className="w-32 h-32 rounded-full border-4" />
						)}
					</div>

					<div className="absolute bottom-5 left-1/2 -translate-x-1/2">
						<ImagePlus className="w-8 h-8 opacity-0 group-hover:opacity-100 transition duration-300" />
					</div>
					<p className="text-sm text-gray-500 mt-2 text-center cursor-pointer">
						{displayImage ? "Change avatar" : "Upload avatar"}
					</p>
				</div>

				<input
					type="file"
					id={name}
					accept="image/*"
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							const reader = new FileReader();
							reader.onload = () => {
								setValue(name, reader.result as string);
							};
							reader.readAsDataURL(file);
						}
					}}
				/>
			</label>
		</>
	);
}

export default AvatarInput;
