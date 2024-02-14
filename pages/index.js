import BaseLayout from "layouts/BaseLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePageSections from "sections/HomePageSections";

// Fetching data from the JSON file
// import fsPromises from "fs/promises";
// import path from "path";
import BlankForecastSection from "sections/HomePageSections/BlankForecastSection";
// import result from "json_data/Blank-level-Forecast.json";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { BLANK_LEVEL_DATA_URL } from "constants/API_URLS";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import {
	DEPARTMENT,
	PRODUCT_ID,
	TEAM_NAME,
	WAREHOUSE,
} from "constants/BLANK_LEVEL_DATA_KEYS";
import { fetchPageDataStart, setPageData } from "redux/pageData/pageDataSlice";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
// export async function getStaticProps() {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"json_data/Blank-level-Forecast.json",
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
export default function Home() {
	// const sheets = result.result.sheet;
	// console.log({ sheets });
	const router = useRouter();
	const dispatch = useDispatch();
	const warehouse = router.query && router.query[WAREHOUSE];
	const teamName = router.query && router.query[TEAM_NAME];
	const productId = router.query && router.query[PRODUCT_ID];
	const department = router.query && router.query[DEPARTMENT];

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

	const fetchPageData = () => {
		const data = {
			limit: "100000",
			Warehouse: warehouse,
			Department: department,
			"Team Name": teamName,
			"Product ID": productId,
		};
		// setLoading(true);
		dispatch(fetchPageDataStart({ url: BLANK_LEVEL_DATA_URL, data }));
	};
	useEffect(() => {
		// if (productId || warehouse || teamName || department) {
		// 	return fetchPageData(warehouse, department, teamName, productId);
		// }
		fetchPageData();
	}, [warehouse, productId, teamName, department]);

	useEffect(() => {
		if (!currentUser.email) router.push("/login");
	}, [currentUser, router]);
	return (
		<BaseLayout pageTitle={`Blank Level Forecast`}>
			<SectionTitleText>Blank Level Forecast</SectionTitleText>

			{sectionLoading && <SectionLoader />}
			{!sectionLoading &&
				Array.isArray(pageData) &&
				pageData.length === 0 && (
					<DescriptionText>
						No results found.{" "}
						<SecondaryButton onClick={() => fetchPageData()}>
							{" "}
							Retry
						</SecondaryButton>
					</DescriptionText>
				)}
			{
				// !sectionLoading &&
				Array.isArray(pageData) && pageData.length > 0 && (
					<BlankForecastSection tableData={pageData} />
				)
			}
		</BaseLayout>
	);
}
