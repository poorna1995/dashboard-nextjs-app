import React from "react";
// Fetching data from the JSON file
// import fsPromises from "fs/promises";
// import path from "path";
import BaseLayout from "layouts/BaseLayout";
import HomePageSections from "sections/HomePageSections";
import SellThroughSection from "sections/HomePageSections/SellThroughSection";
// import result from "json_data/Sell-Through-Data.json";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageDataStart } from "redux/pageData/pageDataSlice";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import { useEffect } from "react";
import { SELL_THROUGH_DATA_URL } from "constants/API_URLS";
// export async function getStaticProps() {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"json_data/Sell-Through-Data.json",
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

const SellThroughDataPage = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	// const warehouse = router.query && router.query[WAREHOUSE];
	// const teamName = router.query && router.query[TEAM_NAME];
	// const productId = router.query && router.query[PRODUCT_ID];
	// const department = router.query && router.query[DEPARTMENT];

	const { currentUser, filters, pageData, sectionLoading } =
		useSelector(mapState);

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
			limit: "100000",
			// Warehouse: warehouse,
			// Department: department,
			// "Team Name": teamName,
			// "Product ID": productId,
		};
		// setLoading(true);
		dispatch(fetchPageDataStart({ url: SELL_THROUGH_DATA_URL, data }));
	};
	useEffect(
		() => {
			handleFetchPageData();
		},
		[
			// warehouse, productId,
			// teamName, department
		],
	);
	return (
		<BaseLayout pageTitle={`Sell Through Data`}>
			<SectionTitleText>Sell Through Data</SectionTitleText>
			{sectionLoading && <SectionLoader />}

			{!sectionLoading &&
				Array.isArray(pageData) &&
				pageData.length > 0 && (
					<SellThroughSection tableData={pageData}  />
				)}
		</BaseLayout>
	);
};

export default SellThroughDataPage;
