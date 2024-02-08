import { connection } from './config/connection';
import { httpServer } from './config/socketIo';
const PORT = 4000;

//*channels
connection();

httpServer.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
