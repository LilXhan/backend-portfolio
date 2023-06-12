import createApp from './app';

(async () => {
  const port = 3000;
  const httpServer = await createApp();
  httpServer.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
  });
})();