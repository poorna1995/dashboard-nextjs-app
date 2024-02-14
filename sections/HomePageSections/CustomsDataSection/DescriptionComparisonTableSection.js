import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CUSTOMS_DATA_URL } from "constants/API_URLS";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComparisonDataStart } from "redux/pageData/pageDataSlice";
import TableSection from "sections/CommonSections/TableSection";
import lodash, { filter } from "lodash";
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import MultipleSelect from "components/Common/Inputs/SelectInput/MultipleSelect";
import { useState } from "react";
import { MdClose } from "react-icons/md";
const mapState = ({ pageData }) => ({
	comparisonData: pageData.comparisonData,
});
const DescriptionComparisonTableSection = ({}) => {
	const dispatch = useDispatch();

	const { comparisonData } = useSelector(mapState);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const fetchComparisonData = () => {
		const data = {};
		dispatch(fetchComparisonDataStart({ url: CUSTOMS_DATA_URL, data }));
	};
	useEffect(() => {
		fetchComparisonData();
	}, []);

	const [selectedDescriptions, setSelectedDescriptions] = useState([]);
	// new code for creating data structure
	const result = comparisonData.result;
	const groupedCountries = lodash.groupBy(result, "Country");
	const groupByDescription = (data) => lodash.groupBy(data, "Description");

	const countryOptions = Object.keys(groupByDescription(result)).map(
		(item) => {
			return {
				label: item,
				value: item,
			};
		},
	);
	const handleCountrySelection = (e) => {
		const mapItem = e.map((item) => item.value);
		console.log({ selection: mapItem });
		setSelectedDescriptions(mapItem);
	};
	const handleRemoveItem = (e, item) => {
		const list = selectedDescriptions.filter((it) => it !== item);
		setSelectedDescriptions(list);
	};
	return (
		<Paper>
			<Box sx={{ padding: "32px" }}>
				<SectionTitleText>
					Select Description for comparison (Max 6)
				</SectionTitleText>

				<MultipleSelect
					title={`Descriptions (${countryOptions.length})`}
					options={countryOptions}
					value={selectedDescriptions.map((item) => {
						return { label: item, value: item };
					})}
					onChange={(e) => handleCountrySelection(e)}
					isDisabled={selectedDescriptions.length >= 6}
				/>
			</Box>
			{/* {Array.isArray(selectedDescriptions) &&
				selectedDescriptions.length > 1 && ( */}
			<>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										fontSize: "18px",
										fontWeight: "700",
										paddingLeft: "48px",
									}}
								>
									Countries
								</TableCell>
								{selectedDescriptions.map((item, id) => (
									<TableCell
										key={id}
										sx={{
											fontSize: "18px",
											fontWeight: "700",
										}}
									>
										<span> {item}</span>
										<IconButton
											onClick={(e) =>
												handleRemoveItem(e, item)
											}
										>
											<MdClose />
										</IconButton>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(groupedCountries)
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage,
								)

								.map(([key, value], index) => {
									return (
										<TableRow key={index}>
											<TableCell
												sx={{
													maxWidth: "400px",
													paddingLeft: "48px",
												}}
											>
												{key}
											</TableCell>
											{selectedDescriptions.map(
												(item, id) => {
													// const countryAmount =
													// 	lodash.groupBy(
													// 		value,
													// 		"Country",
													// 	);
													const valueOfCountry =
														groupByDescription(
															value,
														);
													const itemArray =
														valueOfCountry[item];
													const itemValue =
														Array.isArray(
															itemArray,
														) &&
														itemArray[0][
															"Year 2021"
														];
													if (itemValue)
														return (
															<TableCell key={id}>
																{itemValue}
																{/* {countryAmount[item]} */}
															</TableCell>
														);
													return (
														<TableCell key={id}>
															X
														</TableCell>
													);
												},
											)}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 100]}
					component="div"
					count={Object.entries(groupedCountries).length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</>
			{/* )} */}
		</Paper>
	);
};

export default DescriptionComparisonTableSection;
