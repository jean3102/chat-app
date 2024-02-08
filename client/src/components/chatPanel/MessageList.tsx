import { useEffect, useRef, useState } from 'react';
import { socket } from '../../config/clientSocket';
import { Messages } from '../../types/message';
import { UserList } from '../../types/usersList';
import { autoScrollDown } from '../../utils/autoScrollDown';
import '../../css/chatPanel/messageList.css';

const MessageList = () => {
	const [messageList, setMessageList] = useState<Messages[]>([]);
	const messageListRef = useRef<HTMLUListElement>(null);
	useEffect(() => {
		socket.on('getMessages', (msg: Messages[]) => {
			const dataUser = JSON.parse(
				sessionStorage.getItem('userData') || ''
			) as UserList;

			const mapMessage = msg.map((message) =>
				message.id === dataUser.id ? { ...message, from: 'Me' } : message
			);
			setMessageList(mapMessage);

			//* Scroll to the bottom when items change
			if (messageListRef.current) {
				autoScrollDown(messageListRef.current);
			}
		});
	}, []);

	return (
		<ul
			className="messageList"
			ref={messageListRef}>
			{messageList.map((message, index) =>
				message.from === 'Me' ? (
					<li
						key={index}
						className="me">
						<b>{message.from}</b>
						<span>{message.message}</span>
						<span className="time">{message.time}</span>
					</li>
				) : (
					<li
						key={index}
						className="other">
						<b>{message.from}</b>
						<span>{message.message}</span>
						<span className="time">{message.time}</span>
					</li>
				)
			)}

			{/* <li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="me">
				<b>Me</b>
				<span>muy bien y tu</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="me">
				<b>Me</b>
				<span>muy bien y tu</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>como estas</span>
			</li>
			<li className="me">
				<b>Me</b>
				<span>muy bien y tu</span>
			</li>
			<li className="other">
				<b>marcos-Nx5x</b>
				<span>tranquilo en la casa</span>
			</li>
			<li className="me">
				<b>Me</b>
				<span>que bueno</span>
			</li> */}
		</ul>
	);
};

export default MessageList;
