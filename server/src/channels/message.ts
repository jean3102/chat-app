import { io } from '../config/socketIo';
import { UsersList } from '../types/userList';

export const messageChannel = () => {
	const userList = <UsersList[]>[];
	io.on('connection', (socket) => {
		socket.on('connected', (user: UsersList) => {
			userList.push(user);

			socket.emit('connected', userList);
			socket.broadcast.emit('connected', userList);
		});

		socket.on('disconnect', () => {
			const deleteDisconnect = userList.filter((user) => user.id !== socket.id);
			socket.broadcast.emit('connected', deleteDisconnect);
		});
	});
};
