import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes';
import Helmet from 'helmet';

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['https://flavioalvarado.me'],
  },
});
config();

app.use(express.json());
app.use(cors({
  origin: ['https://flavioalvarado.me'],
}));
app.use(Helmet());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

app.use('/api/v1', router);
app.set('io', io);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});