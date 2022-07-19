import { StatusBar } from "expo-status-bar";
import { useTheme, VStack } from "native-base";
import { Button } from "../../Components/Button";

import { Header } from "../../Components/Header";
import { Input } from "../../Components/Input";


export function Register() {
	const { colors } = useTheme();

	return (
		<VStack flex={1} bg="gray.600" p={6}>
			<StatusBar style="light" translucent={false} backgroundColor={colors.gray[600]} />

			<Header title="Nova solicitação" />

			<Input
				placeholder="Número do patrimônio"
				mt={4}
			/>

			<Input
				placeholder="Descrição do problema"
				mt={5}
				flex={1}
				multiline
				textAlignVertical="top"
			/>

			<Button title="Cadastrar" mt={5} />
		</VStack>
	);
}