import { Socket } from 'socket.io';
import { UsersList } from '../types/userList';
import { Message } from '../types/chat';
import { getHour } from '../utils/getHours';

const userList = <UsersList[]>[];
const messageList = <Message[]>[];

const connected = (socket: Socket) => {
	socket.on('connected', (user: UsersList) => {
		userList.push(user);

		socket.emit('connected', userList);
		socket.broadcast.emit('connected', userList);
		socket.broadcast.emit('getMessages', messageList);
		socket.emit('getMessages', messageList);
	});
};

const disconnect = (socket: Socket) => {
	socket.on('disconnect', () => {
		const findId = userList.findIndex((i) => i.id === socket.id);
		userList.splice(findId, 1);

		socket.broadcast.emit('connected', userList);
	});
};

const getMessages = (socket: Socket) => {
	socket.on('getMessages', () => {
		socket.broadcast.emit('getMessages', messageList);
		socket.emit('getMessages', messageList);
	});
};

const setMessages = (socket: Socket) => {
	socket.on('setMessages', (message: Message) => {
		messageList.push({ ...message, time: getHour() });

		socket.broadcast.emit('getMessages', messageList);
		socket.emit('getMessages', messageList);
	});
};

export { connected, getMessages, setMessages, disconnect };
