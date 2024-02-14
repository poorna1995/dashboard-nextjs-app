import { Box } from "@mui/material";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import React from "react";
import FilterSection from "sections/CommonSections/FilterSection";
import TableSection from "sections/CommonSections/TableSection";
import BlankForecastSection from "./BlankForecastSection";
import ComponentForecastSection from "./ComponentForecastSection";
import SellThroughSection from "./SellThroughSection";

const HomePageSections = () => {
	return (
		<Box sx={{ minHeight: "100vh" }}>
			<BasicTabs data={tabsData} centered />
		</Box>
	);
};

export default HomePageSections;

const tabsData = [
	{
		id: 0,
		label: "Blank Forecast",
		component: <BlankForecastSection />,
	},
	{
		id: 1,
		label: "Component Forecast",
		component: <ComponentForecastSection />,
	},
	{
		id: 2,
		label: "Sell Through",
		component: <SellThroughSection />,
	},
];
