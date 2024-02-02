import { FormEvent, useRef } from 'react';
import UserConnectionList from './UserConnectionList';
import { notyf } from '../lib/noty';
import './css/userPanel.css';
import { inputValidation } from '../utils/inputValidation';

const UserPanel = () => {
	const userName = useRef<HTMLInputElement>(null);

	const handleValidation = () => {
		if (userName.current?.value !== '') return true;
		inputValidation(userName.current);
		notyf.error('type name to connect');
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (!handleValidation()) return;
		if (userName.current) userName.current.value = '';
	};

	return (
		<section className="userPanel">
			<form
				action="userForm"
				onSubmit={handleSubmit}>
				<input
					ref={userName}
					type="name"
					placeholder="Type your name"
				/>
				<button
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
			<UserConnectionList />
		</section>
	);
};

export default UserPanel;
