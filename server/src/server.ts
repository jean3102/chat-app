import { httpServer } from "./config/socketIo";
const PORT = 4000;

httpServer.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
