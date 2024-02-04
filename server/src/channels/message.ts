import { io } from '../config/socketIo';

export const messageChannel = () => {
	io.on('connection', (socket) => {
		console.log('connection established', socket.id);

		socket.on('usersConnected', (users) => {
			console.log(`🚀 ------------ users from server:`, users);
			socket.broadcast.emit('usersConnected', users);
		});

		socket.on('disconnect', () => {
			socket.broadcast.emit('disconnectedUser', socket.id);
		});
	});
};
