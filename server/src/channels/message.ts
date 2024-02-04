import { io } from '../config/socketIo';
import { UsersList } from '../types/userList';

export const messageChannel = () => {
	const userList = <UsersList[]>[];
	io.on('connection', (socket) => {
		console.log('connection established', socket.id);

		socket.on('usersConnected', (users) => {
			console.log(`🚀 ------------ users from server:`, users);
			userList.push(users);
			socket.broadcast.emit('usersConnected', users);
			socket.emit('userList', userList);
		});

		socket.on('disconnectedUser', (id) => {
			console.log(`🚀 ------------ userList:`, userList);
			const newUsersList = userList.filter((user) => user.id !== id);
			console.log(`🚀 ------------ newUsersList:`, newUsersList);
			// socket.broadcast.emit('usersConnected', newUsersList);
			socket.emit('userList', newUsersList);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
			socket.broadcast.emit('disconnectedUser', socket.id);
		});
	});
};
