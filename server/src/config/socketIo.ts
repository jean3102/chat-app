import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
	},
});

export { httpServer, io };
