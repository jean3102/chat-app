import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('/');

const useConnection = () => {
	useEffect(() => {
		socket.on('connect_error', (err) => {
			alert(err.message);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const setConnection = () => {
		const { id } = socket.on('connection', (socket) => socket);
		return id;
	};

	const emitUser = (user: string) => socket.emit('usersConnected', user);

	const listConnections = () => {
		socket.on('usersConnected', (userConnected) => {
			console.log(`🚀 ------------ userConnected:`, userConnected);
		});
	};

	return { setConnection, listConnections, emitUser };
};

export default useConnection;
