import { Request, Response } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import prisma from '../utils/prisma';
import { matchedData } from 'express-validator';

export class ProjectsController {

  public async get(req: Request, res: Response) {
    try {
      const projects = await prisma.project.findMany({
        include: {
          image: true
        }
      });
      res.status(200).json({
        status: 'OK',
        data: projects
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async create(req: Request, res: Response) {
    try {
      const body = matchedData(req);
      const project = await prisma.project.create({
        data: {
          title: body.title,
          description: body.description,
          github: body.github,
          demo: body.demo,
          tag: body.tag,
          user: { connect: { email: body.user } },
        }
      });
      res.status(201).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async retrieve(req: Request, res: Response) {
    try {
      const { id } = matchedData(req);
      const project = await prisma.project.findUnique({
        where: {
          id: id
        }
      });
      res.status(200).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async update(req: Request, res: Response) {
    try {
      const {id, ...body} = matchedData(req);
      const project = await prisma.project.update({
        where: {
          id: id
        },
        data: {
          title: body.title,
          description: body.description,
          github: body.github,
          demo: body.demo,
          tag: body.tag,
          user: { connect: { email: body.user } } 
        }
      });
      res.status(200).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);  
    };
  };
  
  public async delete(req: Request, res: Response) {
    try {
      const { id } = matchedData(req);
      const project = await prisma.project.delete({
        where: {
          id: id
        }
      });
      res.status(200).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
    handleErrorHttp(res, 400, error.message);    
    };
  };
};