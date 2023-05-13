import prisma from '../utils/prisma';
import handleErrorHttp from '../utils/errorHttp';
import { Request, Response } from 'express';
import { uploadFile } from '../utils/s3';
import deleteFileInDirStatic from '../utils/deleteFIle';

class StorageController {
  public async create(req: Request, res: Response) {
    try {
      const { idProject } = req.body;
      const { filename } = req.file!;

      const image = await prisma.image.create({
        data: {
          url: 'none',
          filename: filename,
          project: { connect: { id: Number(idProject) } }
        }
      });

      const result = await uploadFile(filename);
      deleteFileInDirStatic(filename);
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