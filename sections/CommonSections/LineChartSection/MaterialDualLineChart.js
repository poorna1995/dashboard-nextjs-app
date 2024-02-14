import React from "react";
import Chart from "react-google-charts";

export const defaultOptions = {
	chart: {
		title: `Inventory: Saw Tooth Plot`,
	},
	// width: 900,
	height: 500,
	series: {
		// Gives each series an axis name that matches the Y-axis below.
		0: { axis: "inventory" },
		1: { axis: "usage" },
	},
	axes: {
		// Adds labels to each axis; they don't have to match the axis names.
		y: {
			inventory: { label: "On Hand Qty" },
			demand: { label: "Usage / Damaged Qty" },
		},
	},
};

const MaterialDualLineChart = ({ data, title, options }) => {
	return (
		<Chart
			chartType="Line"
			width="100%"
			// height="400px"
			data={data}
			options={{
				title: title,
				legend: defaultOptions.legend,
				...options,
				...defaultOptions,
			}}
		/>
	);
};

export default MaterialDualLineChart;
