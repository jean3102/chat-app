import { messageChannel } from './channels/message';
import { httpServer } from './config/socketIo';
const PORT = 4000;

//*channels
messageChannel();

httpServer.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
