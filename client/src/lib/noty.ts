import { Notyf } from 'notyf';
import 'react-toastify/dist/ReactToastify.css';
import '../lib/notyf.min.css';

export const notyf = new Notyf({
	duration: 1000,
	position: {
		x: 'center',
		y: 'top',
	},
});
