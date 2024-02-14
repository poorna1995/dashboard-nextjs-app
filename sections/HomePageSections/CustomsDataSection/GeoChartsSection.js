import BaseDialog from "components/Common/Dialog";
import React from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";

export const sampleData = [
	["Country", "Popularity"],
	["Germany", 200],
	["United States", 300],
	["Brazil", 400],
	["Canada", 500],
	["France", 600],
	["RUSSIA", 700],
];

const GeoChartsSection = ({ data, width }) => {
	return (
		<div>
			<Chart
				chartType="GeoChart"
				// chartEvents={[
				// 	{
				// 		eventName: "select",
				// 		callback: ({ chartWrapper }) => {
				// 			const chart = chartWrapper.getChart();
				// 			const selection = chart.getSelection();
				// 			if (selection.length === 0) return;
				// 			const region = data[selection[0].row + 1];
				// 			console.log("Selected : " + region);
				// 		},
				// 	},
				// ]}
				options={{
					colors: ["blue"],
					displayMode: "regions",
				}}
				width={width || "100%"}
				height="600px"
				data={data}
			/>
		</div>
	);
};

export default GeoChartsSection;
