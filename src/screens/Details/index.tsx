import React, { useState, useEffect } from "react";
import { Alert, Keyboard } from "react-native";

import { Root } from "popup-ui";
import { usePopup } from "../../utils/usePopup";
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from "phosphor-react-native";

import { dateFormat } from "../../utils/firestoreDateFormat";

import { StatusBar } from "expo-status-bar";
import { HStack, Icon, ScrollView, Text, useTheme, VStack } from "native-base";
import { Loading } from "../../Components/Loading";

import firestore from "@react-native-firebase/firestore";
import { OrderFirestoreDTO } from "../../DTOs/OrderDTO";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "../../Components/Header";
import { OrderProps } from "../../Components/Order";
import { CardDetails } from "../../Components/CardDetails";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";



type RouteParams = {
	orderId: string;
}

type OrderDetails = OrderProps & {
	description: string;
	solution: string;
	closed: string;
}

export function Details() {
	const [isLoading, setIsLoading] = useState(true);
	const [solution, setSolution] = useState("");
	const [order, setOrder] = useState<OrderDetails>();

	const route = useRoute();
	const { orderId } = route.params as RouteParams;

	const { colors } = useTheme();
	const navigation = useNavigation();

	function handleOrderClose() {
		if (!solution) {
			usePopup({ title: "Atenção", text: "Por favor, insira uma solução para o problema.", type: "Warning" });
			return;
		}

		setIsLoading(true);

		firestore()
			.collection<OrderFirestoreDTO>("orders")
			.doc(orderId)
			.update({
				status: "closed",
				solution,
				closedAt: firestore.FieldValue.serverTimestamp()
			})
			.then(() => {
				Alert.alert("Sucesso", "O problema foi fechado com sucesso.");
				navigation.goBack();
			})
			.catch(error => {
				usePopup({ title: "Erro", text: "Não foi possível encerrar a solicitação", type: "Danger" });
				Keyboard.dismiss();
				setIsLoading(false);
			});
	}

	useEffect(() => {
		firestore().collection<OrderFirestoreDTO>("orders")
			.doc(orderId)
			.get()
			.then((doc) => {
				const { status, createdAt, description, patrimony, closedAt, solution } = doc.data();
				const closed = closedAt ? dateFormat(closedAt) : null;

				if (solution) {
					setSolution(solution);
				}

				setOrder({
					id: doc.id,
					status,
					when: dateFormat(createdAt),
					description,
					patrimony,
					closed,
					solution,
				});

				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Root>
			<VStack flex={1} bg="gray.700">
				<StatusBar style="light" translucent={false} backgroundColor={colors.gray[600]} />

				<Header title="Solicitação" />

				<HStack bg="gray.700" justifyContent="center" p={4}>
					{
						order.status === "closed"
							? <Icon as={<CircleWavyCheck size={22} color={colors.green[300]} />} />
							: <Icon as={<Hourglass size={22} color={colors.secondary[700]} />} />
					}

					<Text
						fontSize="sm"
						color={order.status === "closed" ? colors.green[300] : colors.secondary[700]}
						ml={2}
						textTransform="uppercase"
					>
						{order.status === "closed" ? "Finalizada" : "Em andamento"}
					</Text>
				</HStack>

				<ScrollView showsVerticalScrollIndicator={false} mx={5}>
					<CardDetails
						title="equipamento"
						description={`Patrimônio: ${order.patrimony}`}
						icon={DesktopTower}
						footer={order.when}
					/>

					<CardDetails
						title="descrição do problema"
						description={order.description}
						icon={Clipboard}
					/>

					<CardDetails
						title="solução"
						icon={CircleWavyCheck}
						footer={order.closed && `Encerrado em ${order.closed}`}
					>
						<Input
							bg="gray.500"
							placeholder="Descrição da solução"
							onChangeText={setSolution}
							h={24}
							textAlignVertical="top"
							multiline
							value={solution}
							isDisabled={order.status === "closed"}
						/>
					</CardDetails>
				</ScrollView>

				{
					order.status === "open" &&
					<Button
						title="Encerrar Solicitação"
						m={5}
						onPress={handleOrderClose}
					/>
				}
			</VStack>
		</Root>
	);
}