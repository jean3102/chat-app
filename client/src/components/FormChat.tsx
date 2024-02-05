import { FormEvent, useRef } from 'react';
import { inputValidation } from '../utils/inputValidation';
import './css/formChat.css';

type FormChatProps = {
	handleChat: (msg: string) => void;
};

const FormChat = ({ handleChat }: FormChatProps) => {
	const message = useRef<HTMLInputElement>(null);
	const handleSubmitRef = useRef<HTMLButtonElement>(null);

	const handleValidation = () => {
		if (sessionStorage.getItem('socketId') === null) return false;
		if (message.current?.value !== '') return true;
		inputValidation(message.current);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (!handleValidation()) return;

		const msg = message.current?.value;
		if (msg) handleChat(msg);
		if (message.current) message.current.value = '';
	};
	return (
		<form
			className="formChat"
			action=""
			onSubmit={handleSubmit}>
			<input
				type="Message"
				name="message"
				placeholder="Type your message..."
				ref={message}
			/>

			<button
				ref={handleSubmitRef}
				type="submit">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fill="currentColor"
						d="m21.426 11.095l-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909l-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81"
					/>
				</svg>
			</button>
		</form>
	);
};

export default FormChat;
