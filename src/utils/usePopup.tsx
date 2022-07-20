import { Popup } from "popup-ui";

interface PopupProps {
	type: "Success" | "Danger" | "Warning",
	title: string;
	text: string;
}

export function usePopup({ text, title, type }: PopupProps) {
	return Popup.show({
		type,
		title,
		button: true,
		textBody: text,
		buttonText: "Ok",
		callback: () => Popup.hide(),
	});
}