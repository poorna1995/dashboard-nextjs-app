import { Grid } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import { useDispatch } from "react-redux";
import { setFilters } from "redux/filters/filtersSlice";
import { useRouter } from "next/router";

const FilterSection = ({ data, content }) => {
	// const
	const {
		pageTitle,
		// data
	} = content;
	const dispatch = useDispatch();
	const router = useRouter();
	const [selectValue, setSelectValue] = useState([]);
	const uniqueSelectedValues = lodash.uniqBy(selectValue, "filterTitle");

	// console.log({ selectValue, uniqueSelectedValues });
	// {
	//     "filterTitle": "Warehouse",
	//     "valueSelected": "NTP"
	// }

	const newFilters =
		Array.isArray(uniqueSelectedValues) &&
		uniqueSelectedValues
			.map((item) => {
				const { filterTitle, valueSelected } = item;
				return `${filterTitle}=${valueSelected}`;
			})
			.flat();
	const joinThePath = Array.isArray(newFilters) && newFilters.join("&");

	// const arrayToString = Array.isArray(newFilters) && newFilters.toString();
	// const splitString = joinThePath.split("=");
	const handleValueChanges = (e, item) => {
		setSelectValue([
			{
				filterTitle: item.title,
				valueSelected: e.value,
			},
			...selectValue,
		]);
		dispatch(setFilters({ pageTitle, filterValues: uniqueSelectedValues }));
	};

	// console.log({
	// 	router: router,
	// 	uniqueSelectedValues,
	// 	newFilters,
	// 	joinThePath,
	// 	arrayToString,
	// 	splitString,
	// });
	useEffect(() => {
		// dispatch(setFilters({ pageTitle, filterValues: uniqueSelectedValues }));

		router.replace(`${router.pathname}?${joinThePath}`);
	}, [selectValue]);
	// const redirectRoute = () => {
	// 	const pathname = router.pathname;
	// 	// console.log({ pathname });
	// 	uniqueSelectedValues.map((item) => {
	// 		return;
	// 	});
	// 	router.replace(`${pathname}?search`);
	// };
	return (
		<div>
			<Grid container spacing={2}>
				{data.map((item, index) => {
					return (
						<Grid item md={item.md || 3} xs={12} key={index}>
							<FormSelectInput
								title={
									<span>
										{item.title} ({item.options.length})
									</span>
								}
								options={item.options}
								onChange={(e) => handleValueChanges(e, item)}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default FilterSection;
