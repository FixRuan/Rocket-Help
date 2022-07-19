import React, { useState } from "react";
import { VStack, Heading, useTheme, Icon } from "native-base";
import { StatusBar } from "expo-status-bar";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../../assets/Logo/Logo-full.svg";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Keyboard } from "react-native";

export function SignIn() {
	const { colors } = useTheme();
	const background = colors.gray[600];

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSignIn() {
		console.log(email, password);

		setEmail("");
		setPassword("");
		Keyboard.dismiss();
	}

	return (
		<>
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

				<Button title="entrar" w="full" onPress={handleSignIn} />
			</VStack>
		</>
	);
}