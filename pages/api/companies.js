import dbConnect from "utils/mongoDbConnect";
import {
	getCompanies,
	createCompany,
} from "backend/controllers/companyController";
export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			await getCompanies(req, res);
			break;
		case "POST":
			await createCompany(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}