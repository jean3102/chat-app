import { FormEvent, useRef, useState } from 'react';
import { notyf } from '../../lib/noty';
import { inputValidation } from '../../utils/inputValidation';
import useConnection from '../../hooks/useConnection';
import { UserList } from '../../types/usersList';
import '../../css/userPanel/formConnection.css';

type FormConnectionProps = {
	handleConnection: (user: UserList) => void;
};

const FormConnection = ({ handleConnection }: FormConnectionProps) => {
	const userName = useRef<HTMLInputElement>(null);
	const handleSubmitRef = useRef<HTMLButtonElement>(null);
	const [idConnected, setIdConnected] = useState('');
	const { setConnection } = useConnection();

	const handleValidation = () => {
		if (idConnected) {
			notyf.error('there is already a user connected');
			return false;
		}

		if (userName.current?.value !== '') return true;

		inputValidation(userName.current);
		notyf.error('type name to connect');
	};

	const handleDisableElement = () => {
		if (userName.current && handleSubmitRef.current) {
			userName.current.disabled = true;
			userName.current.value = '';
			handleSubmitRef.current.disabled = true;
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (!handleValidation()) return;

		const socketId = setConnection();
		const name = userName.current?.value;

		if (socketId && name) {
			setIdConnected(socketId);
			handleConnection({
				id: socketId,
				name: name,
			});
		}

		handleDisableElement();
	};

	return (
		<form
			className="formConnection"
			action="userForm"
			onSubmit={handleSubmit}>
			<input
				ref={userName}
				type="name"
				placeholder="Type your name"
			/>
			<button
				ref={handleSubmitRef}
				className="tooltip"
				type="submit">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fill="none"
						stroke="currentColor"
						d="M10 21c-2.5 2.5-5 2-7 0s-2.5-4.5 0-7l3-3l7 7zm4-18c2.5-2.5 5-2 7.001 0c2.001 2 2.499 4.5 0 7l-3 3L11 6zm-3 7l-2.5 2.5zm3 3l-2.5 2.5z"
					/>
				</svg>
			</button>
		</form>
	);
};

export default FormConnection;
