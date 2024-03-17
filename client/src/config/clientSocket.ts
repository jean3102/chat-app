import { io } from 'socket.io-client';
const SERVER = import.meta.env.VITE_NODE_ENV;
export const socket = io(SERVER);
