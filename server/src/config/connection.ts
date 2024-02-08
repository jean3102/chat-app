import {
	connected,
	disconnect,
	getMessages,
	setMessages,
} from '../channels/chat';
import { io } from '../config/socketIo';
import { Message } from '../types/chat';
import { UsersList } from '../types/userList';

export const connection = () => {
	io.on('connection', (socket) => {
		console.log('socket from server', socket.id);
		connected(socket);
		disconnect(socket);
		getMessages(socket);
		setMessages(socket);
	});
};
