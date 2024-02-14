import React from "react";

import lodash from "lodash";
import TableSection from "sections/CommonSections/TableSection";
import GeoChartsSection from "./GeoChartsSection";
import FilterSection from "sections/CommonSections/FilterSection";
import { useSelector } from "react-redux";
import Chart from "react-google-charts";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { Grid } from "@mui/material";
import millify from "millify";
import { Box } from "@mui/system";
import CountryComparisonTableSection from "./CountryComparisonTableSection";
import DescriptionComparisonTableSection from "./DescriptionComparisonTableSection";

const mapState = ({ filters, pageData }) => ({
	filters: filters.filters.filterValues,
	pageData: pageData.pageData.result,
	filterOptions: pageData.pageData.filter,
});

const CustomsDataSection = ({ data }) => {
	const { filters, pageData, filterOptions } = useSelector(mapState);

	const content = {
		pageTitle: "Customs Data",
	};

	const router = useRouter();
	const countryName = router.query["Country"];

	const groupedData = lodash.groupBy(pageData, "Country");

	const sumItems = (data, key) => lodash.sumBy(data, key);

	const totalValue = sumItems(pageData, "Year 2021");
	const allItemsSum = Object.entries(groupedData).map(([key, value]) => {
		const sumTotal = sumItems(value, "Year 2021");
		return {
			country: key,
			data: value,
			total: sumTotal,
		};
	});
	const countries = Object.keys(groupedData).map((item) => item);
	const headerRow = ["Country", "Amount"];
	// order data
	// let orderedData = pageData && lodash.orderBy(pageData, "Year Mon", "asc");

	// group data according to `Year Mon` key

	// let groupByYear = lodash.groupBy(orderedData, "Year Mon");

	// function to get sum of key values in data

	const getSumOfKeys = (data, key) => lodash.sumBy(data, key);
	// return the array of arrays with sum of keys
	let sumOfTheActualsAsArray = Object.entries(groupedData).map(
		([key, value]) => {
			return [
				key,
				getSumOfKeys(value, "Year 2021"),
				// millify(getSumOfKeys(value, "Year 2021")),
			];
		},
	);

	//  the all data array to display in chart
	const allData = [headerRow, ...sumOfTheActualsAsArray];

	const countriesOptions = filterOptions.Country;
	const descriptionOptions = filterOptions.Description;
	const staticFilters = [
		{
			title: "Countries",
			groupedItems: countriesOptions,
			md: 3,
		},
		{
			title: "Description",
			groupedItems: descriptionOptions,
			md: 6,
		},
	];

	let filterOptionsFromState = Object.entries(filterOptions).map(
		([key, value]) => {
			return {
				title: key,
				groupedItems: value,
			};
		},
	);

	console.log({
		// groupByKeys,
		filterOptionsFromState,
	});
	const filterData = staticFilters
		// Array.isArray(filterOptionsFromState) &&
		// filterOptionsFromState
		// .orderBy(filterOPtionsFromState, "options.length", "desc")
		.map((item) => {
			const { title, groupedItems, md } = item;
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
				md,
				options: objectKeys,
			};
		});

	return (
		<div style={{ paddingBottom: "64px" }}>
			<FilterSection data={filterData} content={content} />
			<Grid
				container
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "64px",
				}}
			>
				<Grid item md={4} sx={{ padding: "32px" }}>
					<BaseCard sx={{ padding: "16px" }}>
						<SectionTitleText>
							Selected Value: <br />
							{millify(totalValue)}
						</SectionTitleText>
					</BaseCard>
				</Grid>
				<Grid item md={8}>
					<GeoChartsSection data={allData} />
				</Grid>
			</Grid>
			<Box sx={{ padding: "32px" }}>
				<TableSection
					data={pageData}
					headerData={[
						"Country",
						"HTS Number",
						"Description",
						"Year 2021",
					]}
				/>
			</Box>
			<Box sx={{ padding: "32px" }}>
				<CountryComparisonTableSection />
			</Box>
			<Box sx={{ padding: "32px" }}>
				<DescriptionComparisonTableSection />
			</Box>
		</div>
	);
};

export default CustomsDataSection;
