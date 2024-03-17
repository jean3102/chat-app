import FormChat from './FormChat';
import MessageList from './MessageList';
import { socket } from '../../config/clientSocket';
import { UserList } from '../../types/usersList';
import '../../css/chatPanel/chatPanel.css';

const ChatPanel = () => {
	const handleChat = (msg: string) => {
		handleUserData(msg);
	};

	const handleUserData = (msg: string) => {
		const dataUser = JSON.parse(
			sessionStorage.getItem('userData') || ''
		) as UserList;

		socket.emit('setMessages', {
			message: msg,
			from: `${dataUser.name}-${dataUser.id.slice(0, 4)}`,
			id: dataUser.id,
		});
	};

	return (
		<section className="chatPanel">
			<section className="headChat">
				<div>
					<svg
						width="25.72"
						height="24"
						viewBox="0 0 1920 1792"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M593 896q-162 5-265 128H194q-82 0-138-40.5T0 865q0-353 124-353q6 0 43.5 21t97.5 42.5T384 597q67 0 133-23q-5 37-5 66q0 139 81 256m1071 637q0 120-73 189.5t-194 69.5H523q-121 0-194-69.5T256 1533q0-53 3.5-103.5t14-109T300 1212t43-97.5t62-81t85.5-53.5T602 960q10 0 43 21.5t73 48t107 48t135 21.5t135-21.5t107-48t73-48t43-21.5q61 0 111.5 20t85.5 53.5t62 81t43 97.5t26.5 108.5t14 109t3.5 103.5M640 256q0 106-75 181t-181 75t-181-75t-75-181t75-181T384 0t181 75t75 181m704 384q0 159-112.5 271.5T960 1024T688.5 911.5T576 640t112.5-271.5T960 256t271.5 112.5T1344 640m576 225q0 78-56 118.5t-138 40.5h-134q-103-123-265-128q81-117 81-256q0-29-5-66q66 23 133 23q59 0 119-21.5t97.5-42.5t43.5-21q124 0 124 353m-128-609q0 106-75 181t-181 75t-181-75t-75-181t75-181t181-75t181 75t75 181"
						/>
					</svg>
					<h1>Group Chat</h1>
				</div>
			</section>

			<section className="bodyChat">
				<MessageList />
			</section>

			<section className="footChat">
				<FormChat handleChat={handleChat} />
			</section>
		</section>
	);
};

export default ChatPanel;
