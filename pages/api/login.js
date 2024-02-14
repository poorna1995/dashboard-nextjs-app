import dbConnect from "utils/mongoDbConnect";
import { loginUser } from "backend/controllers/userController";
export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "POST":
			await loginUser(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
