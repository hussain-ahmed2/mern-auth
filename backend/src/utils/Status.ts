import { Response } from "express";

class Status {
	private code: number;
	private message: string;
	private success: boolean;
	private data?: unknown;

	constructor({
		code,
		success = false,
		message,
		data,
	}: {
		code: number;
		success?: boolean;
		message: string;
		data?: unknown;
	}) {
		this.code = code;
		this.success = success;
		this.message = message;
		this.data = data;
	}

	public send(res: Response): Response {
		const responseBody: {
			message: string;
			success: boolean;
			data?: unknown;
		} = {
			message: this.message,
			success: this.success,
			...(this.data ?? {}),
		};

		return res.status(this.code).json(responseBody);
	}
}

export default Status;
