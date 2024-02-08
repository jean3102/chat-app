import './css/App.css';
import ChatPanel from './components/chatPanel/ChatPanel';
import UserPanel from './components/userPanel/UserPanel';

const App = () => {
	return (
		<main>
			<UserPanel />
			<ChatPanel />
		</main>
	);
};

export default App;
