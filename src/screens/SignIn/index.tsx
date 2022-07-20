/* eslint-disable indent */
/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { Root } from "popup-ui";

import auth from "@react-native-firebase/auth";

import { VStack, Heading, useTheme, Icon } from "native-base";
import { StatusBar } from "expo-status-bar";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../../assets/Logo/Logo-full.svg";

import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Keyboard } from "react-native";
import { usePopup } from "../../utils/usePopup";

export function SignIn() {
	const { colors } = useTheme();
	const background = colors.gray[600];

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSignIn() {
		if (!password || !email) {
			usePopup({ title: "SignIn", text: "Preencha todos os campos", type: "Danger" });
			Keyboard.dismiss();
			return;
		}

		setIsLoading(true);

		auth().signInWithEmailAndPassword(email, password)
			.then(response => {
				console.log(response);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);

				console.log(error.code);

				switch (error.code) {
					case "auth/user-not-found":
						usePopup({ title: "SignIn", text: "Usuário não encontrado", type: "Danger" });
						break;
					case "auth/wrong-password":
						usePopup({ title: "SignIn", text: "Email ou senha inválida", type: "Danger" });
						break;
					case "auth/invalid-email":
						usePopup({ title: "SignIn", text: "Email ou senha inválida", type: "Danger" });
						break;
					case "auth/network-request-failed":
						usePopup({ title: "SignIn", text: "Sem conexão com a internet", type: "Danger" });
						break;
					case "auth/user-disabled":
						usePopup({ title: "SignIn", text: "Usuário desabilitado", type: "Danger" });
						break;
					case "auth/unknown":
						usePopup({ title: "SignIn", text: "Credenciais inválidas", type: "Warning" });
						break;
					default:
						usePopup({ title: "SignIn", text: "Erro desconhecido", type: "Danger" });
						break;
				}
			});

		setEmail("");
		setPassword("");
		Keyboard.dismiss();
	}

	return (
		<Root>
			<StatusBar translucent={false} style="light" backgroundColor={background} />
			<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
				<Logo />

				<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
					Acesse sua conta
				</Heading>

				<Input
					placeholder="E-mail"
					mb={3}
					InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
					onChangeText={setEmail}
					value={email}
				/>

				<Input
					mb={8}
					secureTextEntry
					placeholder="Senha"
					InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
					onChangeText={setPassword}
					value={password}
				/>

				<Button
					title="entrar"
					w="full"
					onPress={handleSignIn}
					isLoading={isLoading}
				/>
			</VStack>
		</Root>
	);
}