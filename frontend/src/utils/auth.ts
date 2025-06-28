import { API } from "../api/axios";

export const fetchUser = async () => {
	try {
		const res = await API.get("/auth/profile");
		return res.data.user;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const logout = async () => {
	try {
		await API.post("/auth/logout");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
