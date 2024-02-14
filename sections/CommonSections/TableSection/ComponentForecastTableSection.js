import {
	Card,
	Chip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import { useState } from "react";

/**
 * {
    "key": "FG-155522",
    "common": {
        "DM SKU": "FG-155522",
        "Component Name": "NFL BBI / 67NM-BBGH / Royal Jersey Large Wordmark - White Bills",
        "Department": "NFL",
        "Class": "Buffalo Bills",
        "Qty In-stock": 14558,
        "Available to Sell": 13582,
        "l10": 1537,
        "l20": 3309,
        "l30": 3914,
        "l60": 7249,
        "l90": 8799,
        "l365": 19342,
        "On PO": 0,
        "On PO(60)": 0,
        "Comp Forecast Avg": 13060,
        "Recommended Buy Avg OO(60)": 0,
        "Sell Off": 0.11
    },
    "data": [
        {
            "Blanks PO": 11978,
            "Blank Name": "Buffalo Bills Men's Nike Team Color - Royal",
            "l30(Blank)": 3695,
            "Blanks OH": 11107,
            "Blanks OO(30)": 6838,
            "Blanks OO(60)": 6838
        },
        {
            "Blanks PO": 0,
            "Blank Name": "Buffalo Bills ProLine Big & Tall Rep TC",
            "l30(Blank)": 18,
            "Blanks OH": 95,
            "Blanks OO(30)": 0,
            "Blanks OO(60)": 0
        },
        {
            "Blanks PO": 16,
            "Blank Name": "Buffalo Bills NFL Amazon Men's PL Jersey",
            "l30(Blank)": 201,
            "Blanks OH": 383,
            "Blanks OO(30)": 16,
            "Blanks OO(60)": 16
        }
    ]
}
 */
const ComponentForecastTableSection = ({ newData, data, headerRowData }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogData, setDialogData] = useState([]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const getHeaderData = newData.map((item) => item.common);

	const getColumnTitles = Object.keys(getHeaderData[0]).map((item) => item);
	const getRowsData = newData.map((item) => {
		const { key, common, data } = item;
		return item;
	});
	const handleItemClick = (e, item) => {
		console.log("itemClicked", { data });
		setOpenDialog(true);
		setDialogData(item);
	};
	const handleDialogClose = async () => {
		await setOpenDialog(false);
		// setDialogData([]);
	};
	console.log({ getHeaderData, getColumnTitles, newData });
	return (
		<Paper>
			<TableContainer>
				<Table stickyHeader sx={{ top: "200px" }}>
					<TableHead>
						<TableRow>
							{getColumnTitles.map((item, index) => (
								<TableCell
									key={index}
									sx={{ minWidth: "200", fontWeight: 700 }}
								>
									{item}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{/* {newData} */}
						{newData
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage,
							)

							.map((item, index) => (
								<TableRow
									key={index}
									onClick={(e) => handleItemClick(e, item)}
								>
									{Object.values(item.common).map(
										(obj, index) => (
											<TableCell
												key={index}
												sx={{ minWidth: "auto" }}
											>
												{obj}
											</TableCell>
										),
									)}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 100]}
				component="div"
				count={newData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<BaseDialog
				open={openDialog}
				handleClose={() => handleDialogClose()}
			>
				<DialogChildComponent dialogData={dialogData} />
			</BaseDialog>
		</Paper>
	);
};

export default ComponentForecastTableSection;

const DialogChildComponent = ({ dialogData }) => {
	const { common, data } = dialogData && dialogData;
	const header =
		Array.isArray(data) && Object.keys(data[0]).map((item) => item);
	return (
		<BaseCard sx={{ padding: "32px" }}>
			<DescriptionText>
				Component Name:{" "}
				<span style={{ fontWeight: 700 }}>
					{common && common["Component Name"]}
				</span>
			</DescriptionText>
			<TableContainer
				sx={{
					border: "1px solid rgba(0,0,0,0.1)",
					borderRadius: "8px",
					marginTop: "16px",
				}}
			>
				<Table>
					<TableHead sx={{ fontWeight: 700 }}>
						<TableRow>
							{Array.isArray(header) &&
								header.map((item, index) => (
									<TableCell
										key={index}
										sx={{ fontWeight: 700 }}
									>
										{item}
									</TableCell>
								))}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(data) &&
							data.map((item, index) => {
								const getKeys = Object.values(item).map(
									(key, index) => (
										<TableCell key={index} label={key}>
											{key}
										</TableCell>
									),
								);
								return (
									<TableRow key={index}>{getKeys}</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</BaseCard>
	);
};
