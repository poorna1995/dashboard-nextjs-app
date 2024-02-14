import React, { useEffect, useState } from "react";
import FilterSection from "sections/CommonSections/FilterSection";
import LineChartSection from "sections/CommonSections/LineChartSection";
import TableSection from "sections/CommonSections/TableSection";
import lodash from "lodash";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
	ACTUALS,
	AVG_FORECAST,
	DEPARTMENT,
	LB_FORECAST,
	PRODUCT_ID,
	TEAM_NAME,
	UB_FORECAST,
	WAREHOUSE,
	YEAR_MONTH,
} from "constants/BLANK_LEVEL_DATA_KEYS";

const mapState = ({ filters, pageData }) => ({
	filters: filters.filters.filterValues,
	pageData: pageData.pageData.result,
	filterOptions: pageData.pageData.filter,
});

const BlankForecastSection = ({ tableData }) => {
	const { filters, pageData, filterOptions } = useSelector(mapState);
	// console.log({ tableData });
	const content = {
		pageTitle: "Blank Level Forecast",
	};
	// const router = useRouter();
	// const department = router.query && router.query["Department"];
	// const productId = router.query && router.query["Product ID"];
	// const teamName = router.query && router.query["Team Name"];
	// const warehouse = router.query && router.query["Warehouse"];

	// console.log({ department, productId, teamName, warehouse });

	// const [dataList, setDataList] = useState(pageData);

	let filterList = (data, key, value) =>
		Array.isArray(data) &&
		data.filter((item) => {
			if (item[key].includes(value)) return item;
			return;
		});

	// let filterByWareHouse =
	// 	warehouse && filterList(dataList, "Warehouse", "NTP");
	// let filterByDepartment =
	// 	department && filterList(dataList, "Department", department);
	// let filterByTeamName =
	// 	teamName && filterList(dataList, "Team Name", teamName);
	// let filterByProductID =
	// 	productId && filterList(dataList, "Product ID", productId);
	// let filterByWareHouseAndDepartment =
	// 	// warehouse &&
	// 	department && filterList(filterByWareHouse, "Department", department);
	// let filterByWareHouseDepartAndTeamName =
	// 	// warehouse &&
	// 	teamName &&
	// 	department &&
	// 	filterList(filterByWareHouseAndDepartment, "Team Name", teamName);
	// let filterByAll =
	// 	// warehouse &&
	// 	teamName &&
	// 	department &&
	// 	productId &&
	// 	filterList(filterByWareHouseDepartAndTeamName, "Product ID", productId);

	// console.log({
	// 	filterByWareHouse,
	// 	filterByDepartment,
	// 	filterByTeamName,
	// 	filterByProductID,
	// 	filterByWareHouseAndDepartment,
	// 	filterByWareHouseDepartAndTeamName,
	// 	filterByAll,
	// });
	// const returnList = () => {
	// 	if (warehouse) {
	// 		// if (department) {
	// 		// 	if (teamName) {
	// 		// 		if (productId) {
	// 		// 			return setDataList(filterByAll);
	// 		// 		}

	// 		// 		return setDataList(filterByWareHouseDepartAndTeamName);
	// 		// 	}
	// 		// 	return setDataList(filterByWareHouseAndDepartment);
	// 		// }
	// 		return setDataList(filterByWareHouse);
	// 	}
	// 	if (department) {
	// 		// if (teamName) {
	// 		// 	if (productId) {
	// 		// 		return setDataList(filterByAll);
	// 		// 	}
	// 		// 	return setDataList(filterByWareHouseDepartAndTeamName);
	// 		// }
	// 		return setDataList(filterByDepartment);
	// 	}
	// 	if (teamName) return setDataList(filterByTeamName);

	// 	if (productId) return setDataList(filterByProductID);
	// 	// if (warehouse && department)
	// 	// 	return setDataList(filterByWareHouseAndDepartment);
	// 	// if (warehouse || (department && teamName))
	// 	// 	return setDataList(filterByWareHouseDepartAndTeamName);
	// 	// if (warehouse || (department && teamName && productId))
	// 	// 	return setDataList(filterByAll);

	// 	// if (warehouse) return setDataList(filterByWareHouse);
	// };
	// useEffect(() => {
	// 	// returnList();
	// }, [productId, department, teamName, warehouse]);
	// if(filters.contains())
	const filterValues =
		Array.isArray(filters) &&
		filters
			.map((item) => {
				return filterList(item.filterTitle, item.valueSelected);
			})
			.flat();

	// console.log({ filterValues });

	// const intersectionOfAll = lodash.intersection(filterValues);
	// const gGetFilteredResult =
	// console.log({ intersectionOfAll });
	// Header how for data to display charts
	const headerRow = [
		"Year Mon",
		"Actuals",
		"Avg Forecast",
		"LB Forecast",
		"UB Forecast",
	];
	// order data
	let orderedData = pageData && lodash.orderBy(pageData, "Year Mon", "asc");

	// group data according to `Year Mon` key

	let groupByYear = lodash.groupBy(orderedData, "Year Mon");

	// function to get sum of key values in data

	const getSumOfKeys = (data, key) => lodash.sumBy(data, key);
	// return the array of arrays with sum of keys
	let sumOfTheActualsAsArray = Object.entries(groupByYear).map(
		([key, value]) => {
			return [
				key,
				getSumOfKeys(value, "Actuals"),
				getSumOfKeys(value, "Avg Forecast"),
				getSumOfKeys(value, "LB Forecast"),
				getSumOfKeys(value, "UB Forecast"),
			];
		},
	);

	//  the all data array to display in chart
	const allData = [headerRow, ...sumOfTheActualsAsArray];
	console.log({ allData });
	// for filters data
	const group = tableData.map((item) => {
		let it = Object.keys(item).map((ob) => ob);
		return it;
	});

	//  flatten the array
	const flattenedArr = lodash.flatten(group);
	// get the union of keys
	const unionHeader = lodash.union(flattenedArr);
	// console.log(unionHeader);

	let groupData = (data, key) => lodash.groupBy(data, key);
	let filterTitles = [WAREHOUSE, DEPARTMENT, TEAM_NAME, PRODUCT_ID];

	let groupByKeys = filterTitles.map((item) => {
		let groupedItems = groupData(tableData, item);

		return { title: item, groupedItems };
	});
	let filterOptionsFromState =
		// lodash.groupBy(filterOptions, "key");
		// filterTitles.map((item) => {
		Object.entries(filterOptions).map(([key, value]) => {
			return {
				title: key,
				groupedItems: value,
			};
		});

	console.log({
		groupByKeys,
		filterOptionsFromState,
	});
	// .slice(0, 4);
	let commonTitles = [
		YEAR_MONTH,
		...filterTitles,
		AVG_FORECAST,
		LB_FORECAST,
		UB_FORECAST,
		ACTUALS,
	];
	// unionHeader.reduce((a, b) =>
	// 	a.filter((c) => b.includes(c)),
	// );
	// console.log({ commonTitles });
	// let newFilterData = groupByKeys.map((item) => {});
	// console.log({ groupByKeys });

	// data structure for filters

	const filterData =
		Array.isArray(filterOptionsFromState) &&
		filterOptionsFromState
			// .orderBy(filterOPtionsFromState, "options.length", "desc")
			.map((item) => {
				const { title, groupedItems } = item;
				let objectKeys =
					Array.isArray(groupedItems) &&
					groupedItems.map((objItem) => {
						return {
							label: objItem,
							value: objItem,
						};
					});
				return {
					title,
					options: objectKeys,
				};
			});
	// console.log({ filterData });

	/**
	 * [
    {
        "filterTitle": "Product ID",
        "valueSelected": "88483-Pittsburgh Steelers Men's Nike Team Color - Black"
    },
    {
        "filterTitle": "Warehouse",
        "valueSelected": "NTP"
    }
]
	 */

	// const filterList =
	// 	Array.isArray(listOfData) &&
	// 	listOfData.filter((item) => {
	// 		const {} = item;
	// 		// let value = filterTitle: 'Warehouse', valueSelected: 'NTP'
	// 		let values = filters.map((filterItem) => filterItem.valueSelected);
	// 		// return values;
	// 	});
	// console.log(filterList);
	return (
		<div>
			<FilterSection data={filterData} content={content} />
			{/* <MaterialDualLineChart data={allData} /> */}
			<LineChartSection
				data={allData}
				title={content.pageTitle}
				options={{
					hAxis: {
						title: "Years",
					},
					vAxis: {
						title: "Sales Qty.",
					},
				}}
			/>
			<div style={{ padding: "32px" }}>
				<TableSection data={pageData} headerData={commonTitles} />
			</div>
			{/* <FilterSection content={content} /> */}
		</div>
	);
};

export default BlankForecastSection;
