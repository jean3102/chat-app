import { useEffect } from 'react';
import { socket } from '../config/clientSocket';

const useConnection = () => {
	useEffect(() => {
		socket.on('connect_error', (err) => {
			alert(err.message);
		});

		//* Remove SessionStore when user leaves page or reload
		window.addEventListener('beforeunload', function () {
			this.sessionStorage.removeItem('socketId');
		});

		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	const setConnection = () => {
		const { id } = socket.on('connection', (socket) => socket);
		return id;
	};

	return { setConnection };
};

export default useConnection;
