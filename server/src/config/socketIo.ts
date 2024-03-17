import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		// origin: 'https://chatapp31.netlify.app',
		origin: 'http://localhost:5173',
	},
});

export { httpServer, io };
