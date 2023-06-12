import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes';
import Helmet from 'helmet';
// import graphql
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import resolvers from './graphql/resolvers';
import Schema from './graphql/schemas.graphql';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

const createApp = async () => {
  const app: Express = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: ['https://flavioalvarado.me'],
    },
  });
  config();
  
  // graphql
  
  const server = new ApolloServer({
    typeDefs: [ 
      Schema,
      scalarsTypeDefs
    ],
    resolvers: [
      resolvers,
      scalarsResolvers
    ],
    plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ]
  });
  
  await server.start();

  app.use(express.json());
  app.use(cors({
    origin: ['https://flavioalvarado.me'],
  }));
  app.use(Helmet());
  
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
  });
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  }));
  app.use('/api/v1', router);
  app.set('io', io);
  
  return httpServer;
}

export default createApp;


