import createApp from './app';

(async () => {
  const port = process.env.PORT;
  const httpServer = await createApp();
  httpServer.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
  });
})();