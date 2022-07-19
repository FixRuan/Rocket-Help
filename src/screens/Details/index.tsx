import { StatusBar } from "expo-status-bar";
import { Text, useTheme, VStack } from "native-base";
import { Header } from "../../Components/Header";

import { useRoute } from "@react-navigation/native";

type RouteParams = {
	orderId: string;
}

export function Details() {
	const { colors } = useTheme();
	const route = useRoute();
	const { orderId } = route.params as RouteParams;

	return (
		<VStack flex={1} bg="gray.700">
			<StatusBar style="light" translucent={false} backgroundColor={colors.gray[600]} />

			<Header title="Solicitação" />

			<Text color="white">{orderId}</Text>
		</VStack>
	);
}