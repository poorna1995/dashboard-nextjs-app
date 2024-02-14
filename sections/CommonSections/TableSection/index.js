import {
	Box,
	Card,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import lodash from "lodash";
const TableSection = ({ data, headerData }) => {
	// get the values of keys from data
	const group =
		Array.isArray(data) &&
		data.map((item) => {
			let it = Object.keys(item).map((ob) => ob);
			return it;
		});

	//  flatten the array
	const flattenedArr = lodash.flatten(group);
	// get the union of keys
	const unionHeader = lodash.union(flattenedArr);

	// get the header keys
	const headerKeys = headerData
		// Object.keys(unionHeader)
		.map((item) => {
			return {
				field: item,
				// headerName: item,
				width: 250,
				// fontWeight: "700",
			};
		});
	// console.log({ unionHeader });
	// console.log({ headerKeys, group, unionHeader });
	// show the data
	const dataList =
		Array.isArray(data) &&
		data.map((item, index) => {
			return {
				id: index,
				...item,
			};
		});

	return (
		<Card
			elevation={4}
			sx={{ height: 600, width: "100%", marginTop: "32px" }}
		>
			<DataGrid
				sx={{
					".MuiDataGrid-columnHeaderTitle": {
						fontWeight: 700,
					},
				}}
				columns={headerKeys}
				rows={dataList}
				// pageSize={10}
				rowsPerPageOptions={[10, 20, 100]}
				pagination
				// checkboxSelection
				disableColumnMenu
				disableColumnFilter
				disableSelectionOnClick
			/>
			{/* <Table>
				<TableHead>
					{headerKeys.map((item, index) => (
						<TableCell key={index}>
							<Typography sx={{ fontWeight: 700 }}>
								{item}
							</Typography>
						</TableCell>
					))}
				</TableHead>
				<TableBody>
					{dataList.map((item, index) => (
						<TableRow key={index}>
							{Object.values(item).map((objItem, objIndex) => (
								<TableCell key={objIndex}>{objItem}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table> */}
		</Card>
	);
};

export default TableSection;
