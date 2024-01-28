import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const PORT = 4000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
	},
});

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Welcome');
});

io.on('connection', (socket) => {
	console.log('Connection established');

	socket.on('message', (msg) => {
		console.log(`🚀 ------------ msg:`, msg);
		io.emit('message', msg);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

httpServer.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
