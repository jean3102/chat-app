import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import { CORS } from './ennVariables';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: CORS,
	},
});

export { httpServer, io };
