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
const CountryComparisonTableSection = ({}) => {
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
	const [selectedCountries, setSelectedCountries] = useState([]);
	// new code for creating data structure
	const result = comparisonData.result;
	const groupByDescription = lodash.groupBy(result, "Description");
	const groupByCountry = (data) => lodash.groupBy(data, "Country");

	const countryOptions = Object.keys(groupByCountry(result)).map((item) => {
		return {
			label: item,
			value: item,
		};
	});
	const handleCountrySelection = (e) => {
		const mapItem = e.map((item) => item.value);
		console.log({ selection: mapItem });
		setSelectedCountries(mapItem);
	};
	const handleRemoveItem = (e, item) => {
		const list = selectedCountries.filter((it) => it !== item);
		setSelectedCountries(list);
	};
	return (
		<Paper>
			<Box sx={{ padding: "32px" }}>
				<SectionTitleText>
					Select Countries for comparison (Max 6)
				</SectionTitleText>

				<MultipleSelect
					title={`Countries (${countryOptions.length})`}
					options={countryOptions}
					value={selectedCountries.map((item) => {
						return { label: item, value: item };
					})}
					onChange={(e) => handleCountrySelection(e)}
					isDisabled={selectedCountries.length >= 6}
				/>
			</Box>
			{/* {Array.isArray(selectedCountries) && selectedCountries.length > 1 && (
				<> */}
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											fontSize: "18px",
											fontWeight: "700",
										}}
									>
										Description
									</TableCell>
									{selectedCountries.map((item, id) => (
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
								{Object.entries(groupByDescription)
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
									)

									.map(([key, value], index) => {
										return (
											<TableRow key={index}>
												<TableCell
													sx={{ maxWidth: "600px" }}
												>
													{key}
												</TableCell>
												{selectedCountries.map(
													(item, id) => {
														// const countryAmount =
														// 	lodash.groupBy(
														// 		value,
														// 		"Country",
														// 	);
														const valueOfCountry =
															groupByCountry(
																value,
															);
														const itemArray =
															valueOfCountry[
																item
															];
														const itemValue =
															Array.isArray(
																itemArray,
															) &&
															itemArray[0][
																"Year 2021"
															];
														if (itemValue)
															return (
																<TableCell
																	key={id}
																>
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
						count={Object.entries(groupByDescription).length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				{/* </> */}
			{/* // )} */}
		</Paper>
	);
};

export default CountryComparisonTableSection;
