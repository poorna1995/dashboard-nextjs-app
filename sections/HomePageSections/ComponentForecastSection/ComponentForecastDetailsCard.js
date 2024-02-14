import { Box } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React from "react";

const ComponentForecastDetailsCard = ({
	startDate,
	lastDate,
	avgForecastTotal,
	avgRecommendedBuyTotal,
}) => {
	return (
		<BaseCard
			sx={{
				padding: "32px",
				maxWidth: "800px",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<DescriptionText
					sx={{ flex: 0.5, fontWeight: "700", fontSize: "18px" }}
				>
					Component Forecast
				</DescriptionText>
				<Box
					sx={{
						display: "flex",
						flex: 0.5,
						justifyContent: "space-between",
					}}
				>
					<DescriptionText sx={{ fontSize: "14px" }}>
						<span style={{ fontWeight: "700", fontSize: "18px" }}>
							Avg Forecast
						</span>{" "}
						<br />
						2022-10-31 to 2022-12-30
					</DescriptionText>
					<DescriptionText
						sx={{
							background: "rgba(0,0,0,0.1)",
							height: "32px",
							padding: "4px",
							width: "100px",
							textAlign: "center",
							color: "red",
						}}
					>
						{" "}
						28883342
					</DescriptionText>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flex: 1,
					marginTop: "32px",
				}}
			>
				<DescriptionText
					sx={{ flex: 0.5, fontWeight: "700", fontSize: "18px" }}
				>
					{" "}
					Component Recommendation
				</DescriptionText>
				<Box
					sx={{
						display: "flex",
						flex: 0.5,
						justifyContent: "space-between",
					}}
				>
					<DescriptionText sx={{ fontSize: "14px" }}>
						<span style={{ fontWeight: "700", fontSize: "18px" }}>
							Avg Recommended Buy
						</span>
						<br />
						2022-10-31 to 2022-12-30
					</DescriptionText>
					<DescriptionText
						sx={{
							background: "rgba(0,0,0,0.1)",
							height: "32px",
							padding: "4px",
							textAlign: "center",
							width: "100px",
							color: "red",
						}}
					>
						{" "}
						271426
					</DescriptionText>
				</Box>
			</Box>
		</BaseCard>
	);
};

export default ComponentForecastDetailsCard;
