import { ZodError } from "zod";

export const formatZodError = (error: ZodError): Record<string, string> => {
	const formatted: Record<string, string> = {};

	for (const issue of error.errors) {
		const field = issue.path.join(".") || "form";
		if (!formatted[field]) {
			formatted[field] = issue.message; // Only keep the first error message
		}
	}

	return formatted;
};
