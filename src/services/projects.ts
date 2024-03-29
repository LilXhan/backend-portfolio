import prisma from '../utils/prisma';
import { getFileUrl } from '../utils/s3';
import { deleteFile } from '../utils/s3';

export class ProjectsService {
  
  public async getAllProjects() {
    const images = await prisma.image.findMany();
    for (const image of images) {
      const url = await getFileUrl(image.filename);
      await prisma.image.update({
        where: {
          project_owner: Number(image.project_owner)
        },
        data: {
          url: url
        }
      });
    };
    const projects = await prisma.project.findMany({
      include: {
        image: true
      }
    });

    return projects;
  };

  public async getProjectById(id: string) {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id)
      },
    });

    return project;
  };

  public async createProject(body: any) {
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        github: body.github.href,
        demo: body.demo?.href,
        tag: body.tag,
        user: { connect: { email: body.user_owner } },
      }
    });

    return project;
  };

  public async updateProject(id: string, body: any) {
    const project = await prisma.project.update({
      where: {
        id: Number(id)
      },
      data: {
        title: body.title,
        description: body.description,
        github: body.github.href,
        demo: body.demo?.href,
        tag: body.tag,
        user: { connect: { email: body.user_owner } } 
      }
    });

    return project;
  };

  public async deleteProject(id: string) {

    const image = await prisma.image.findUnique({
      where: {
        project_owner: Number(id)
      }
    });

    if (image) {
      await prisma.image.delete({
        where: { id: image!.id }
      });
      await deleteFile(image!.filename);
    }

    const project = await prisma.project.delete({
      where: {
        id: Number(id)
      }
    });

    return project;
  };
}