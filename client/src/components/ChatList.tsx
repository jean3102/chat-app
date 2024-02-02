import './css/chatList.css';
const ChatList = () => {
	return (
		<ul className="chatList">
			<li className="me">
				<b>Me</b>
				<span>como estas </span>
			</li>
			<li className="other">
				<b>Haly:45214</b>
				<span>
					muy bien y tu como estas Lorem ipsum dolor sit, amet consectetur
					adipisicing elit. Vitae nemo error voluptates odit. Temporibus
					nesciunt cum deleniti exercitationem architecto, totam odit minus
					doloribus quo expedita deserunt quam voluptatum esse. Atque.
				</span>
			</li>
			<li className="me">
				<b>Me</b>
				<span>Y cuando vienes </span>
			</li>
			<li className="other">
				<b>Haly</b>
				<span>muy pronto</span>
			</li>
		</ul>
	);
};

export default ChatList;
