import { Router } from 'express';
import fs from 'fs';

const router: Router = Router();

const extractName = (filename: string) => {
  return filename.split('.').shift();
};

fs.readdir(__dirname, (_, files) => {
  files.filter(file => {
    const name = extractName(file);
    if (name !== 'index') {
      import(`./${name}`).then(moduleName =>{
        router.use(`/${name}`, moduleName.router);
      });
    };
  });
});

export default router;