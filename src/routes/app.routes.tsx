import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Register } from "../screens/Register";
import { Details } from "../screens/Details";


const { Screen, Navigator } = createNativeStackNavigator();

function AppRoutes() {
	return (
		<Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
			<Screen name='home' component={Home} />
			<Screen name='register' component={Register} />
			<Screen name='details' component={Details} />
		</Navigator>
	);
}

export { AppRoutes };