class Env {
	public static readonly PORT: number = Number(process.env.PORT);
	public static readonly MONGODB_URI: string = process.env
		.MONGODB_URI as string;
	public static readonly JWT_SECRET: string = process.env
		.JWT_SECRET as string;
	public static readonly FRONTEND_URL: string = process.env
		.FRONTEND_URL as string;
}

export default Env;
