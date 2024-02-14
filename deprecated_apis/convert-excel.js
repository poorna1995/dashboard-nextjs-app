const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
export const config = {
	api: {
		responseLimit: false,
	},
};
export default async function handler(req, res) {
	const { method } = req;

	// await dbConnect();

	switch (method) {
		case "GET":
			const result = excelToJson({
				// sourceFile: "../../excel_data/Component-Forecast.xlsx",
				source: fs.readFileSync("excel_data/Customs_data.xlsx"),
				header: {
					rows: 1,
				},

				columnToKey: {
					"*": "{{columnHeader}}",
				},
			});
			res.status(200).json({ result });

			break;
		case "POST":
			await loginUser(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
