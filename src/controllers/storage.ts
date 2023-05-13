import handleErrorHttp from '../utils/errorHttp';
import { Request, Response } from 'express';
import deleteFileInDirStatic from '../utils/deleteFIle';
import { StorageService } from '../services/storage';

const storageService = new StorageService();

class StorageController {
  public async create(req: Request, res: Response) {
    try {
      const { idProject } = req.body;
      const { filename } = req.file!;
      const { result, image } = await storageService.createImage(filename, idProject);

      res.status(201).json({
        status: 'OK',
        data: image,
        result: result
      });
    } catch (error: any) {
      const { filename } = req.file!;
      deleteFileInDirStatic(filename);
      handleErrorHttp(res, 400, error.message);  
    };
  };
};

export default StorageController;