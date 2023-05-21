import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes';

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

config();
app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

const PORT = process.env.PORT;

io.on('connection', socket => {
  app.set('socket', socket);
});

httpServer.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});