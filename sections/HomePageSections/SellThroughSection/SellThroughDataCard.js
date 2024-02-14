import { Box, Stack } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React from "react";

const SellThroughDataCard = ({
	onHandQtyDate,
	onHandQty,
	latestUsageQtyDate,
	latestUsageQty,
	totalUsageDamagedQty,
	totalUsageDamagedQtyStartDate,
	totalUsageDamagedQtyEndDate,
}) => {
	return (
		<BaseCard
			sx={{ padding: "32px", maxWidth: "600px", marginBottom: "32px" }}
		>
			<Stack>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<DescriptionText sx={{ fontSize: "14px" }}>
						<span style={{ fontSize: "18px", fontWeight: 700 }}>
							Latest On Hand Qty
						</span>
						<br />
						{onHandQtyDate || `2022-10-30`}
					</DescriptionText>
					<DescriptionText
						sx={{
							background: "rgba(0,0,0,0.1)",
							color: "red",
							width: "100px",
							height: "32px",
							padding: "4px",
							textAlign: "center",
						}}
					>
						{onHandQty || `19931`}
					</DescriptionText>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "16px",
					}}
				>
					<DescriptionText sx={{ fontSize: "14px" }}>
						<span style={{ fontSize: "18px", fontWeight: 700 }}>
							Latest Usage/Damaged Qty:
						</span>
						<br />
						{latestUsageQtyDate || `2022-10-30`}
					</DescriptionText>
					<DescriptionText
						sx={{
							background: "rgba(0,0,0,0.1)",
							color: "red",
							width: "100px",
							height: "32px",
							padding: "4px",
							textAlign: "center",
						}}
					>
						{latestUsageQty || `19931`}
					</DescriptionText>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "16px",
					}}
				>
					<DescriptionText sx={{ fontSize: "14px" }}>
						<span style={{ fontSize: "18px", fontWeight: 700 }}>
							Total Usage/Damaged Qty:
						</span>
						<br />
						{totalUsageDamagedQtyStartDate || `2021-01-10`} to
						{totalUsageDamagedQtyEndDate || `2022-10-23`}
					</DescriptionText>
					<DescriptionText
						sx={{
							background: "rgba(0,0,0,0.1)",
							color: "red",
							width: "100px",
							height: "32px",
							padding: "4px",
							textAlign: "center",
						}}
					>
						{totalUsageDamagedQty || `19931`}
					</DescriptionText>
				</Box>
			</Stack>
		</BaseCard>
	);
};

export default SellThroughDataCard;
