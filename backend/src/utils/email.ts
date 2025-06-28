import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

interface SendEmailOptions {
	to: string;
	subject: string;
	html: string;
}

export const sendEmail = async ({
	to,
	subject,
	html,
}: SendEmailOptions): Promise<void> => {
	try {
		await transporter.sendMail({
			from: `"Mern Auth" <${process.env.EMAIL_USER}>`,
			to,
			subject,
			html,
		});
		console.log("Email sent to:", to);
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email");
	}
};
