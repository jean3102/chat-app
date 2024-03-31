import { config } from 'dotenv';
config();

const NODE_PORT = process.env.NODE_PORT || 3000;
const CORS = process.env.CORS || 'http://localhost:5174';

export { NODE_PORT, CORS };
