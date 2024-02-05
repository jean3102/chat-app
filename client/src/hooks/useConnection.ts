import { useEffect } from 'react';
import { socket } from '../config/clientSocket';

const useConnection = () => {
	useEffect(() => {
		socket.on('connect_error', (err) => {
			alert(err.message);
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
