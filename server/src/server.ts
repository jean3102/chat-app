import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { chatArchived } from './data/chat';

const app = express();
const PORT = 4000;
const httpServer = createServer(app);

type Message = {
	from: string;
	message: string;
};

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
	const socketId = socket.id.slice(0, 5);

	socket.on('message', async (msg: Message) => {
		const message = { ...msg, from: socketId };
		socket.broadcast.emit('message', message);
	});

	// socket.on('online', (id) => {
	// 	console.log('id: ' + id);
	// });

	socket.broadcast.emit('online', socketId);

	socket.on('disconnect', () => {
		console.log('disconnect');
		socket.emit('disconnectUser', socketId);
	});
});

httpServer.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
