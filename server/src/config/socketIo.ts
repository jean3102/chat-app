import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import { CORS } from './envConf';
import cors from 'cors';

const app = express();
const corsOptions = {
	origin: CORS, // Replace with your frontend domain
	methods: ['GET', 'POST'], // Specify the allowed HTTP methods
	allowedHeaders: ['Content-Type'], // Specify the allowed headers
	credentials: true, // Allow sending cookies
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.status(200).send('Welcome');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: CORS,
		methods: ['GET', 'POST'],
	},
	pingTimeout: 60000, // Increase the ping timeout to 60 seconds
	pingInterval: 25000, // Send a ping every 25 seconds
});

export { httpServer, io };
