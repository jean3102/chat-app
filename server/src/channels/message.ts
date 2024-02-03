import { io } from '../config/socketIo';

export const messageChannel = () => {
	io.on('connection', (socket) => {
		console.log('connection established', socket.id);

		socket.on('usersConnected', (users) => {
			console.log(`🚀 ------------ users:`, users)
			socket.emit('usersConnected', users);
		});

		socket.on('disconnect', () => {
			console.log('disconnect');
		});
	});
};
