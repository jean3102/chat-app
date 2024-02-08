import { useEffect, useState } from 'react';
import { notyf } from '../../lib/noty';
import FormConnection from './FormConnection';
import UserConnectionList from './UserConnectionList';
import '../../css/userPanel/userPanel.css';
import { socket } from '../../config/clientSocket';
import { UserList } from '../../types/usersList';

const UserPanel = () => {
	const [userConnected, setUserConnected] = useState<UserList>();
	const [usersList, setUsersList] = useState<UserList[]>([]);

	useEffect(() => {
		socket.on('connected', (users: UserList[]) => {
			const filterUser = users.filter((user) => user.id !== socket.id);
			setUsersList(filterUser);
		});
	}, []);

	const handleConnection = (user: UserList) => {
		setUserConnected(user);
		sessionStorage.setItem('userData', JSON.stringify(user));

		notyf.success('user connected successfully');
		socket.emit('connected', user);
	};

	return (
		<section className="userPanel">
			<FormConnection handleConnection={handleConnection} />

			{userConnected ? (
				<>
					{usersList.length > 0 ? (
						<UserConnectionList usersList={usersList} />
					) : (
						''
					)}
					<div>
						<svg
							className="online"
							width="20"
							height="20"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg">
							<circle
								cx="26"
								cy="16"
								r="4"
								fill="currentColor"
							/>
							<path
								fill="currentColor"
								d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7"
							/>
						</svg>
						<h4>
							{userConnected.name}-{userConnected.id.slice(0, 4)}
						</h4>
					</div>
				</>
			) : (
				<div>
					<svg
						className="offLine"
						width="20"
						height="20"
						color="red"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M24.8 12.136a8.87 8.87 0 0 0-.979-2.543L30 3.414L28.587 2L2 28.587L3.414 30l5-5H23.5a6.497 6.497 0 0 0 1.3-12.864M23.5 23H10.414l11.928-11.928a6.905 6.905 0 0 1 .6 2.071l.099.812l.815.064A4.498 4.498 0 0 1 23.5 23m-19.204.449l1.432-1.431a4.477 4.477 0 0 1 2.416-7.999l.816-.064l.099-.812a6.987 6.987 0 0 1 10.63-5.086l1.443-1.443A8.986 8.986 0 0 0 7.2 12.136A6.49 6.49 0 0 0 4.296 23.45"
						/>
					</svg>
					<h4>Offline </h4>
				</div>
			)}
		</section>
	);
};

export default UserPanel;
