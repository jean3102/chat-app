import { io } from 'socket.io-client';

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const URL = NODE_ENV ?? 'http://localhost:3000';

export const socketServer = io(URL);
