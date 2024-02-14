import { Container } from "@mui/material";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "redux/user/userSlice";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const LoginPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
		const data = { email, password };
		fetch("/api/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				dispatch(signInUser(json));
			});
	};
	useEffect(() => {
		if (currentUser.email) router.push("/");
	}, [currentUser, router]);
	return (
		<div>
			<Container sx={{}}>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					onSubmit={handleLogin}
				>
					<TextInput
						title={"Email"}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextInput
						title="Password"
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<SecondaryButton
						// onClick={() => handleLogin()}
						sx={{
							marginTop: "16px",
						}}
						type="submit"
					>
						Login
					</SecondaryButton>
				</form>
			</Container>
		</div>
	);
};

export default LoginPage;
