import prisma from "../utils/prisma";
import { uploadFile } from "../utils/s3";
import deleteFileInDirStatic from "../utils/deleteFIle";

export class StorageService {

  public async createImage(filename: string, idProject: string) {
    const image = await prisma.image.create({
      data: {
        url: 'none',
        filename: filename,
        project: { connect: { id: Number(idProject) } }
      }
    });

    const result = await uploadFile(filename);
    deleteFileInDirStatic(filename);
    return {
      result,
      image
    };
  };
};