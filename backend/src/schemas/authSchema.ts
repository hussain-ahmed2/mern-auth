import z from "zod";

const authSchema = z.object({
	name: z
		.string({ message: "Name is required" })
		.trim()
		.nonempty("Name is required")
		.min(3, "Name must be at least 3 characters long"),
	email: z
		.string({ message: "Email is required" })
		.trim()
		.nonempty("Email is required")
		.email("Invalid email address"),
	password: z
		.string({ message: "Password is required" })
		.trim()
		.nonempty("Password is required")
		.min(6, "Password must be at least 6 characters long"),
	avatar: z.string().trim().optional(),
	role: z.enum(["user", "admin"]).default("user"),
});

export const registerSchema = authSchema.omit({ role: true });
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = authSchema.pick({ email: true, password: true });
export type LoginSchema = z.infer<typeof loginSchema>;

export const resetPasswordSchema = authSchema.pick({ password: true });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const sendOTPSchema = authSchema.pick({ email: true });
export type SendOTPSchema = z.infer<typeof sendOTPSchema>;

export const editProfileSchema = authSchema
	.pick({ name: true, email: true })
	.extend({
		currentPassword: z.string().trim().optional(),
		newPassword: z.string().trim().optional(),
		avatar: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		const { currentPassword, newPassword } = data;

		const isChangingPassword = currentPassword || newPassword;

		if (isChangingPassword) {
			if (!currentPassword || currentPassword.length < 6) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["currentPassword"],
					message: "Current password must be at least 6 characters",
				});
			}

			if (!newPassword || newPassword.length < 6) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["newPassword"],
					message: "New password must be at least 6 characters",
				});
			}
		}
	});
export type EditProfileSchema = z.infer<typeof editProfileSchema>;
