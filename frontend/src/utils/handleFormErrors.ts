import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const setErrors = <T extends FieldValues>(
	errors: Partial<Record<keyof T, string>>,
	setError: UseFormSetError<T>
): void => {
	(Object.entries(errors) as Array<[Path<T>, string]>).forEach(
		([key, message]) => {
			if (message) {
				setError(
					key,
					{
						type: "manual",
						message,
					},
					{
						shouldFocus: true,
					}
				);
			}
		}
	);
};
