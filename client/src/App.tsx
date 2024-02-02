import './App.css';
import ChatPanel from './components/ChatPanel';
import UserPanel from './components/UserPanel';
const App = () => {
	return (
		<main>
			<UserPanel />
			<ChatPanel />
		</main>
	);
};

export default App;
