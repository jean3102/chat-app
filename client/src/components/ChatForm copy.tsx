import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

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
			console.log(`🚀 ------------ msg:`, msg)
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
			console.log(`🚀 ------------ id:`, id)
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
					placeholder='Message'
					onChange={handleChange}
				/>
				<button type="submit">Chat application</button>
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
