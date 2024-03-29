import { connection } from './config/connection';
import { NODE_PORT } from './config/envConf';
import { httpServer } from './config/socketIo';

//*channels
connection();

httpServer.listen(NODE_PORT, () => {
	console.log(`server listening on port: ${NODE_PORT}`);
});
