import React from "react";
import { NativeBaseProvider } from "native-base";

import { THEME } from "./src/styles/theme";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Loading } from "./src/Components/Loading";

import { SignIn } from "./src/screens/SignIn";
import { Register } from "./src/screens/Register";
import { Home } from "./src/screens/Home";

import { Routes } from "./src/routes";

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold
	});

	return (
		<NativeBaseProvider theme={THEME}>
			{fontsLoaded ? <Routes /> : <Loading />}
		</NativeBaseProvider>
	);
}
