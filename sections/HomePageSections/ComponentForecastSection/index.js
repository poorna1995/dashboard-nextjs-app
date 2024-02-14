import { Box } from "@mui/material";
import React from "react";
import TableSection from "sections/CommonSections/TableSection";

import lodash from "lodash";
import ComponentForecastTableSection from "sections/CommonSections/TableSection/ComponentForecastTableSection";
import FilterSection from "sections/CommonSections/FilterSection";
import {
	DEPARTMENT,
	TEAM_NAME,
	WAREHOUSE,
} from "constants/BLANK_LEVEL_DATA_KEYS";
import { useSelector } from "react-redux";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import ComponentForecastDetailsCard from "./ComponentForecastDetailsCard";

const mapState = ({ pageData }) => ({
	pageData,
});
const ComponentForecastSection = ({ tableData }) => {
	const slicedData = tableData;
	const { pageData } = useSelector(mapState);
	// .slice(0, 1000);
	const filters = pageData.pageData.filter;

	const groupData = (data, key) => lodash.groupBy(data, key);
	// const commonData =
	//  slicedData.map((item) => {
	const headerData = Object.keys(slicedData[0]).map((key) => key);
	const getGroups = headerData.map((key) => {
		let groupedData = groupData(slicedData, key);
		let groupedDataMap = Object.values(groupedData).map((obj) => obj);
		return { key, groupedData: groupedDataMap };
	});
	// return getGroups;
	// return {
	// 	headerRowData: {
	// 		"DM SKU": item["DM SKU"],
	// 		"Component Name": item["Component Name"],
	// 		Department: item["Department"],
	// 	},
	// 	data: [
	// 		{
	// 			"Blanks PO": item["Blanks PO"],
	// 			"Blank Name": item["Blank Name"],
	// 			"l30(Blank)": item["l30(Blank)"],
	// 			"Blanks OH": item["Blanks OH"],
	// 			"Blanks OO(30)": item["Blanks OO(30)"],
	// 			"Blanks OO(60)": item["Blanks OO(60)"],
	// 		},
	// 	],
	// };
	// });
	const groupByDMSKU = lodash.groupBy(slicedData, "DM SKU");
	// const groupedByHeader = lodash.groupBy(
	// 	commonData,
	// 	"headerRowData['Component Name']",
	// 	"headerRowData['DM SKU']",
	// );
	const mapgroupedData = Object.entries(groupByDMSKU).map(([key, value]) => {
		const getCommonValuesFromArray = value.map((item) => {
			const dataObject = {
				"Blanks PO": item["Blanks PO"],
				"Blank Name": item["Blank Name"],
				"l30(Blank)": item["l30(Blank)"],
				"Blanks OH": item["Blanks OH"],
				"Blanks OO(30)": item["Blanks OO(30)"],
				"Blanks OO(60)": item["Blanks OO(60)"],
			};
			return dataObject;
		});
		const item = value[0];
		const firstItem = {
			"DM SKU": item["DM SKU"],
			"Component Name": item["Component Name"],
			Department: item["Department"],
			Class: item["Class"],
			"Qty In-stock": item["Qty In-stock"],
			"Available to Sell": item["Available to Sell"],
			l10: item["l10"],
			l20: item["l20"],
			l30: item["l30"],
			l60: item["l60"],
			l90: item["l90"],
			l365: item["l365"],
			"On PO": item["On PO"],
			"On PO(60)": item["On PO(60)"],
			"Comp Forecast Avg": item["Comp Forecast Avg"],
			"Recommended Buy Avg OO(60)": item["Recommended Buy Avg OO(60)"],
			"Sell Off": item["Sell Off"],
		};
		return { key, common: firstItem, data: getCommonValuesFromArray };
	});
	console.log({ getGroups, groupByDMSKU, mapgroupedData });

	const filterTitles = [WAREHOUSE, TEAM_NAME, DEPARTMENT, "Component Name"];
	const filterData = Object.entries(filters).map(([key, value]) => {
		return {
			title: key,
			options:
				Array.isArray(value) &&
				value.map((item) => {
					return { label: item, value: item };
				}),
		};
	});
	// Array.isArray(filterTitles) &&
	// 	filterTitles.map((item) => {
	// 		return {
	// 			title: item,
	// 		};
	// 	});
	/**
	 * {
    "DM SKU": "FG-155522",
    "Component Name": "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
    "Department": "NFL",
    "Class": "Buffalo Bills",
    "Qty In-stock": 14558,
    "Available to Sell": 13582,
    "l10": 1537,
    "l20": 3309,
    "l30": 3914,
    "l60": 7249,
    "l90": 8799,
    "l365": 19342,
    "On PO": 0,
    "On PO(60)": 0,
    "Blank Name": "Buffalo Bills Men's Nike Team Color - Royal",
    "l30(Blank)": 3695,
    "Blanks OH": 11107,
    "Blanks OO(30)": 6838,
    "Blanks OO(60)": 6838,
    "Blanks PO": 11978,
    "Comp Forecast Avg": 13060,
    "Recommended Buy Avg OO(60)": 0,
    "Sell Off": 0.11
}
	 */
	// const getItemIndex =
	// Array.isArray(tableData) && tableData.find(a=> a. "2022-10-31");
	// const getSumOfKeys = (data, key) => lodash.sumBy(data, key);
	// console.log({ getItemIndex });
	return (
		<Box sx={{ padding: "32px" }}>
			<Box sx={{ paddingBottom: "32px" }}>
				<FilterSection
					data={filterData}
					content={{ pageTitle: "component level" }}
				/>{" "}
			</Box>

			<ComponentForecastDetailsCard />
			<SectionTitleText sx={{ marginTop: "32px", marginBottom: "32px" }}>
				Component Table
			</SectionTitleText>
			<ComponentForecastTableSection
				data={tableData}
				headerRowData={headerData}
				newData={mapgroupedData}
			/>
			{/* <TableSection data={tableData} /> */}
		</Box>
	);
};

export default ComponentForecastSection;
