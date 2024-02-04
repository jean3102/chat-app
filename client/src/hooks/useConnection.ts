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

	// const emitUser = (user: string) => {
	// 	const newArray = [...list, user];
	// 	console.log(`🚀 ------------ emitUserlist:`, list);
	// 	console.log(`🚀 ------------ newArray:`, newArray);
	// 	socket.emit('usersConnected', [...list, user]);
	// };

	// const listConnections = () => {
	// 	socket.on('usersConnected', (userConnected: string[]) => {
	// 		console.log(`🚀 ------------ userConnected:`, userConnected);
	// 		// setList(useConnection);
	// 	});
	// };

	return { setConnection };
};

export default useConnection;
