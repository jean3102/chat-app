import React, { useEffect, useState } from 'react';
import { socketServer } from '../config/socket.js';

type Message = {
	name: string;
	message: string;
};

socketServer.on('connection', () => {
	console.log('connection');
});

socketServer.on('connect_error', (err) => {
	console.log(`connect_error due to ${err.message}`);
});

const ChatForm = () => {
	const [textMessage, setTextMessage] = useState({
		name: '',
		message: '',
	});

	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		socketServer.on('message', (msg: Message) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTextMessage({ ...textMessage, [name]: value });
	};

	const sendMessage = (event: React.FormEvent) => {
		event.preventDefault();

		socketServer.emit('message', textMessage);
	};

	return (
		<section>
			<form onSubmit={sendMessage}>
				<label htmlFor="name">First name:</label>
				<input
					type="name"
					name="name"
					onChange={handleChange}
				/>
				<label htmlFor="message">First name:</label>
				<input
					name="message"
					type="message"
					onChange={handleChange}
				/>
				<button type="submit">Chat application</button>
			</form>
			<ul>
				{messages.map(({ name, message }, index) => (
					<li key={index}>
						<p>{name}</p>
						<p>{message}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ChatForm;
