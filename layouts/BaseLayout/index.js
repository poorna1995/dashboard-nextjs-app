import { Box, Container } from "@mui/material";
import AppHeader from "components/AppHeader";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const BaseLayout = ({
	appHeaderBg,
	pageTitle,
	pageDescription,
	children,
	overflow,
}) => {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	useEffect(() => {
		if (!currentUser.email) router.push("/login");
	}, [currentUser, router]);

	return (
		<Box sx={{ maxWidth: "100%", overflow: overflow || "hidden" }}>
			<Head>
				<title>{`${pageTitle} - Dashboard` || "Dashboard"}</title>
				<meta
					name="description"
					content={pageDescription || "Dashboard"}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<AppHeader appHeaderBg={appHeaderBg} />
			<Box sx={{ marginTop: "64px" }}>{children}</Box>
		</Box>
	);
};

export default BaseLayout;
