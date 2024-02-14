import {
	AppBar,
	Box,
	Button,
	Fade,
	MenuItem,
	Paper,
	Popper,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import MenuItemLink from "components/Common/Menus/MenuItemLink";
// import linksData from "constant_data/navigation/linksData";
import React, { useState } from "react";
import { useEffect } from "react";
import {
	usePopupState,
	bindHover,
	bindPopper,
	bindTrigger,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "redux/user/userSlice";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AppHeader = ({ appHeaderBg, ...props }) => {
	const { window } = props;
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const [popperData, setPopperData] = useState([]);
	const [isPopperOpen, setIsPopperOpen] = useState(false);
	const popupState = usePopupState({
		variant: "popper",
		popupId: "menuPopper",
	});
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [placement, setPlacement] = React.useState();

	const handleClick =
		(newPlacement, data = []) =>
		(event) => {
			setAnchorEl(event.currentTarget);
			setOpen(true);
			setPlacement(newPlacement);
			setPopperData(data);
		};
	// console.log({ popupState, isOpen: popupState.isOpen });
	const router = useRouter();
	const pathname = router.pathname;

	// console.log({ router });
	const handleMenuButtonClick = (link) => {
		// navigate(`${link}`);
		router.push(link);
	};
	const handlePopperOpen = (data) => {
		setIsPopperOpen(true);
		setPopperData(data);
	};
	const handlePopperClose = async (link) => {
		await router.push(link);
		setIsPopperOpen(false);
		// setPopperData([]);
		setOpen(false);
	};

	// console.log
	const handleLogout = () => {
		dispatch(signOutUser({}));
	};
	// console.log({ popperData });
	const links = [
		{
			title: "Blank Forecast",
			url: "/",
		},
		{
			title: "Component Forecast",
			url: "/component-forecast",
		},
		{
			title: "Sell Through Data",
			url: "/sell-through-data",
		},
		{
			title: "Customs Data",
			url: "/custom-data",
		},
	];
	return (
		<>
			<AppBar
				elevation={0}
				color="default"
				sx={
					{
						// bgcolor: appHeaderBg || "rgba(21, 50, 48, 1)",
						// "transparent",
						// color: "white",
					}
				}
			>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						{links.map((item, index) => {
							return (
								<AppLink
									key={index}
									href={item.url}
									sx={{
										marginRight: "16px",
										color:
											pathname === item.url && "#484a9e",
										fontWeight:
											pathname === item.url && 700,
									}}
								>
									{item.title}
								</AppLink>
							);
						})}
						{currentUser.email ? (
							<MenuItem onClick={() => handleLogout()}>
								Logout
							</MenuItem>
						) : (
							<AppLink href="/login">Login</AppLink>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default AppHeader;
