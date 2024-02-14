import { styled, Typography } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
	color: "#2E3749",
	fontSize: "24px",
	lineHeight: "33px",
	fontWeight: "700",

	fontFamily: "Manrope, sans-serif",
}));
const CardTitle = ({ children, ...props }) => {
	return <StyledText {...props}>{children}</StyledText>;
};

export default CardTitle;
