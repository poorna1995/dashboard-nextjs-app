import React from "react";
import TableSection from "sections/CommonSections/TableSection";
import lodash, { filter } from "lodash";
import MaterialDualLineChart from "sections/CommonSections/LineChartSection/MaterialDualLineChart";
import { Box } from "@mui/material";
import SELL_THROUGH_DATA_KEYS, {
	CLOSING_INVENTORY,
	END_DATE,
	START_DATE,
	TOTAL_INVENTORY,
	TOTAL_QTY,
	USAGE_QTY,
} from "constants/SELL_THROUGH_DATA_KEYS";
import { useSelector } from "react-redux";
import FilterSection from "sections/CommonSections/FilterSection";
import SellThroughDataCard from "./SellThroughDataCard";

const mapState = ({ pageData }) => ({
	pageData,
});
const SellThroughSection = ({ tableData }) => {
	console.log({ tableData });
	const { pageData } = useSelector(mapState);
	const headerData = Object.values(SELL_THROUGH_DATA_KEYS).map(
		(item) => item,
	);
	const filters = pageData.pageData.filter;
	//
	/**
	 * Sample Object 
	 * {
    "Product ID (Blank)": 88469,
    "Start Week": "2022-W42",
    "Start Date": "2022-10-23",
    "Initial Inventory": 19931,
    "Usage Qty": 1707,
    "Damage Qty": 116,
    "Total Qty [Usage + Damage]": 1823,
    "Num Days": 7,
    "Inventory Addition": 201,
    "Total Inventory": 20132,
    "Closing Inventory": 18309,
    "Sell-Through Rate(%)": 9.06,
    "End Week": "2022-W43",
    "End Date": "2022-10-30"
}
	 */
	const headerRow = ["Week", "Inventory Plot", "Usage Plot"];

	let orderedData = lodash.orderBy(tableData, "Start Week", "asc");
	let groupByYear = lodash.groupBy(orderedData, "Start Week");

	const getSumOfKeys = (data, key) => lodash.sumBy(data, key);
	let sumOfTheActualsAsArray = Object.entries(groupByYear).map(
		([key, value]) => {
			return [
				key,
				getSumOfKeys(value, "Total Inventory"),
				getSumOfKeys(value, "Total Qty [Usage + Damage]"),
				// getSumOfKeys(value, "LB Forecast"),
				// getSumOfKeys(value, "UB Forecast"),
			];
		},
	);

	const allData = [headerRow, ...sumOfTheActualsAsArray];
	console.log("inside chart", {
		// allData,
		sumOfTheActualsAsArray,
		groupByYear,
	});

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

	const totalUsageAndQty = lodash.sumBy(tableData, TOTAL_QTY);
	return (
		<div>
			<Box sx={{ padding: "32px" }}>
				<Box sx={{ paddingBottom: "32px" }}>
					<FilterSection
						content={{ pageTitle: "Sell through data" }}
						data={filterData}
					/>
				</Box>
				<SellThroughDataCard
					latestUsageQtyDate={tableData[0][START_DATE]}
					onHandQtyDate={tableData[0][START_DATE]}
					onHandQty={tableData[0][CLOSING_INVENTORY]}
					latestUsageQty={tableData[0][TOTAL_QTY]}
					totalUsageDamagedQty={totalUsageAndQty}
					totalUsageDamagedQtyEndDate={tableData[0][START_DATE]}
					totalUsageDamagedQtyStartDate={
						tableData[tableData.length - 1][END_DATE]
					}
				/>
				<MaterialDualLineChart data={allData} />
				<TableSection data={tableData} headerData={headerData} />
			</Box>
		</div>
	);
};

export default SellThroughSection;
