import React from "react";
// import result from "json_data/Customs_data.json";
import BaseLayout from "layouts/BaseLayout";
import CustomsDataSection from "sections/HomePageSections/CustomsDataSection";
import {
	fetchComparisonDataStart,
	fetchPageDataStart,
} from "redux/pageData/pageDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMS_DATA_URL } from "constants/API_URLS";
import { useEffect } from "react";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import { useRouter } from "next/router";

const mapState = ({ user, filters, pageData, views }) => ({
	currentUser: user.currentUser,
	filters: filters.filters.filterValues,
	pageData: pageData.pageData.result,
	sectionLoading: views.sectionLoading,
});

const CustomsDataPage = () => {
	// const data = result.result.sheet;
	const dispatch = useDispatch();
	const { currentUser, filters, pageData, sectionLoading } =
		useSelector(mapState);
	const router = useRouter();
	const countrySelected = router.query["Countries"];
	const htsNumber = router.query["HTS Number"];
	const description = router.query["Description"];

	const fetchPageData = (
		countrySelected = "",
		htsNumber = "",
		description = "",
	) => {
		const data = {
			Country: countrySelected,
			"HTS Number": htsNumber,
			Description: description,
		};
		// setLoading(true);
		dispatch(fetchPageDataStart({ url: CUSTOMS_DATA_URL, data }));
	};
	useEffect(() => {
		if (countrySelected || htsNumber || description) {
			return fetchPageData(countrySelected, htsNumber, description);
		}
		fetchPageData();
	}, [countrySelected, description, htsNumber]);

	return (
		<BaseLayout pageTitle={"Customs Data"}>
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
					<CustomsDataSection data={pageData} />
				)
			}
		</BaseLayout>
	);
};

export default CustomsDataPage;
