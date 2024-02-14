import React from "react";
import Chart from "react-google-charts";

export const tempData = [
	["Year", "Sales", "Expenses"],
	["2004", 1000, 400],
	["2005", 1170, 460],
	["2006", 660, 1120],
	["2007", 1030, 540],
];
export const defaultOptions = {
	title: "",
	// curveType: "function",
	legend: { position: "right" },
};

const LineChartSection = ({ data, title, options }) => {
	return (
		<Chart
			chartType="LineChart"
			width="100%"
			height="400px"
			data={data}
			options={{
				title: title,
				legend: defaultOptions.legend,
				...options,
			}}
		/>
	);
};

export default LineChartSection;
