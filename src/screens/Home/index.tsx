import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../../assets/Logo/Logo-min.svg";
import { Button } from "../../Components/Button";
import { Filter } from "../../Components/Filter";
import { Order, OrderProps } from "../../Components/Order";

export function Home() {
	const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
	const [orders, setOrders] = useState<OrderProps[]>([
		{
			id: "123",
			patrimony: "12312323123",
			status: "open",
			when: "18/08/2005 às 12:00"
		}
	]);

	const { colors } = useTheme();
	const navigation = useNavigation();

	function handleNewOrder() {
		navigation.navigate("register");
	}

	function handleOpenDetails(orderId: string) {
		navigation.navigate("details", { orderId });
	}

	return (
		<VStack flex={1} bg="gray.700" pb={6}>
			<StatusBar style="light" translucent={false} backgroundColor={colors.gray[600]} />

			<HStack
				w="full"
				justifyContent="space-between"
				alignItems="center"
				bg="gray.600"
				pt={12}
				pb={5}
				px={6}
			>
				<Logo />
				<IconButton
					icon={<SignOut size={26} color={colors.gray[300]} />}
				/>
			</HStack>

			<VStack flex={1} px={6}>
				<HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
					<Heading color="gray.100">Meus chamados</Heading>
					<Text color="gray.200">3</Text>
				</HStack>

				<HStack space={3} mb={8}>
					<Filter
						title="em andamento"
						type="open"
						onPress={() => setStatusSelected("open")}
						isActive={statusSelected === "open"}
					/>

					<Filter
						title="finalizados"
						type="closed"
						onPress={() => setStatusSelected("closed")}
						isActive={statusSelected === "closed"}
					/>
				</HStack>

				<FlatList
					data={orders}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <Order onPress={() => handleOpenDetails(item.id)} data={item} />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 60 }}
					ListEmptyComponent={() => (
						<Center>
							<ChatTeardropText color={colors.gray[300]} size={40} />
							<Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
								Você ainda não possui {"\n"}
								solicitações {statusSelected === "open" ? "em andamento" : "finalizadas"}
							</Text>
						</Center>
					)}
				/>

				<Button title="Nova Solicitação" onPress={handleNewOrder} />
			</VStack>
		</VStack>
	);
}