import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './css/formChat.css';

const socket = io('/');
type Message = {
	from: string;
	message: string;
};

socket.on('connection', () => {
	console.log('connection');
});

socket.on('connect_error', (err) => {
	console.log(`connect_error due to ${err.message}`);
});

const ChatForm = () => {
	const [textMessage, setTextMessage] = useState({
		from: '',
		message: '',
	});

	const [isOnline, setOnline] = useState<string[]>([]);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		socket.on('message', (msg: Message) => {
			console.log(`🚀 ------------ msg:`, msg);
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		// socket.on('disconnect', (id: string) => {
		// 	console.log(`🚀 ------------ id:`, id)
		// 	// const newOnline = isOnline.filter((item) => item === id);
		// 	// setOnline(newOnline);
		// });

		socket.on('disconnectUser', (id) => {
			console.log('idUser:', id);
		});

		socket.on('online', (id: string) => {
			console.log(`🚀 ------------ id:`, id);
			setOnline((prevValues) => [...prevValues, id]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTextMessage({ ...textMessage, [name]: value });
	};

	const sendMessage = (event: React.FormEvent) => {
		event.preventDefault();
		setMessages((prevMessages) => [
			...prevMessages,
			{ ...textMessage, from: 'Me' },
		]);

		socket.emit('message', { ...textMessage, from: 'Me' });
	};

	return (
		<section>
			<ul>
				{isOnline.map((value, index) => (
					<li key={index}>{value}</li>
				))}
			</ul>

			<form onSubmit={sendMessage}>
				<input
					name="message"
					type="message"
					placeholder="Message"
					onChange={handleChange}
				/>
				<button type="submit">
					<svg
						width="24"
						height="24"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L7 16L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78m-20.9 10L8.76 17H18v-2H8.76L6.55 6.89L24.76 16Z"
						/>
					</svg>
				</button>
			</form>
			<ul>
				{messages.map(({ from, message }, index) => (
					<li key={index}>
						<p>{from}</p>
						<p>{message}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ChatForm;
