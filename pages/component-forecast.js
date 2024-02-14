import React from "react";

// Fetching data from the JSON file
// import fsPromises from "fs/promises";
// import path from "path";
import BaseLayout from "layouts/BaseLayout";
// import HomePageSections from "sections/HomePageSections";
import ComponentForecastSection from "sections/HomePageSections/ComponentForecastSection";
// import result from "json_data/Component-Forecast.json";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { COMPONENT_LEVEL_DATA_URL } from "constants/API_URLS";
import { fetchPageDataStart, setPageData } from "redux/pageData/pageDataSlice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { fetchPageData } from "redux/pageData/pageData.sagas";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import {
	DEPARTMENT,
	PRODUCT_ID,
	TEAM_NAME,
	WAREHOUSE,
} from "constants/BLANK_LEVEL_DATA_KEYS";
// export async function getStaticProps() {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"json_data/Component-Forecast.json",
// 	);
// 	const jsonData = await fsPromises.readFile(filePath);
// 	const objectData = JSON.parse(jsonData);

// 	return {
// 		props: objectData,
// 	};
// }

const mapState = ({ user, filters, pageData, views }) => ({
	currentUser: user.currentUser,
	filters: filters.filters.filterValues,
	pageData: pageData.pageData.result,
	sectionLoading: views.sectionLoading,
});

const ComponentForecastPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const warehouse = router.query && router.query[WAREHOUSE];
	const teamName = router.query && router.query[TEAM_NAME];
	const productId = router.query && router.query[PRODUCT_ID];
	const department = router.query && router.query[DEPARTMENT];
	const componentName = router.query && router.query["Component Name"];

	const { currentUser, filters, pageData, sectionLoading } =
		useSelector(mapState);

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const newFilters =
		Array.isArray(filters) &&
		filters
			.map((item) => {
				const { filterTitle, valueSelected } = item;
				return `${filterTitle}=${valueSelected}`;
			})
			.flat();
	const joinThePath = Array.isArray(newFilters) && newFilters.join("&");
	// console.log("home", { joinThePath });

	const handleFetchPageData = () => {
		const data = {
			limit: "10000",
			Warehouse: warehouse,
			Department: department,
			"Team Name": teamName,
			"Product ID": productId,
			"Component Name": componentName,
		};
		// setLoading(true);
		dispatch(fetchPageDataStart({ url: COMPONENT_LEVEL_DATA_URL, data }));
	};
	useEffect(() => {
		handleFetchPageData();
	}, []);

	return (
		<BaseLayout>
			<SectionTitleText>Component Forecast</SectionTitleText>
			{sectionLoading && <SectionLoader />}
			{!sectionLoading &&
				Array.isArray(pageData) &&
				pageData.length > 0 && (
					<ComponentForecastSection tableData={pageData} />
				)}
		</BaseLayout>
	);
};

export default ComponentForecastPage;
