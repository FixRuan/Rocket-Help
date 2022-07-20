import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme, VStack } from "native-base";

import { Root } from "popup-ui";
import { Keyboard } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { Input } from "../../Components/Input";
import { usePopup } from "../../utils/usePopup";
import { useNavigation } from "@react-navigation/native";


export function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [patrimony, setPatrimony] = useState("");
	const [description, setDescription] = useState("");

	const navigation = useNavigation();
	const { colors } = useTheme();


	function handleNewOrderRegister() {
		if (!patrimony || !description) {
			usePopup({ title: "Register", text: "Preencha todos os campos", type: "Warning" });
			Keyboard.dismiss();
			return;
		}

		setIsLoading(true);

		firestore().collection("orders")
			.add({
				patrimony,
				description,
				status: "open",
				createdAt: firestore.FieldValue.serverTimestamp()
			})
			.then(() => {
				setIsLoading(false);
				Keyboard.dismiss();
				usePopup({ title: "Solicitação", text: "Solicitação registrada com sucesso", type: "Success" });
				navigation.navigate("home");
			})
			.catch(error => {
				setIsLoading(false);
				usePopup({ title: "Solicitação", text: "Erro ao registrar solicitação", type: "Danger" });
				Keyboard.dismiss();
			});
	}

	return (
		<Root>
			<VStack flex={1} bg="gray.600" p={6}>
				<StatusBar style="light" translucent={false} backgroundColor={colors.gray[600]} />

				<Header title="Nova solicitação" />

				<Input
					placeholder="Número do patrimônio"
					mt={4}
					onChangeText={setPatrimony}
					value={patrimony}
				/>

				<Input
					placeholder="Descrição do problema"
					mt={5}
					flex={1}
					multiline
					textAlignVertical="top"
					onChangeText={setDescription}
					value={description}
				/>

				<Button
					title="Cadastrar"
					mt={5}
					onPress={handleNewOrderRegister}
					isLoading={isLoading}
				/>
			</VStack>
		</Root>
	);
}