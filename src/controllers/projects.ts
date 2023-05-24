import { Request, Response } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import { matchedData } from 'express-validator';
import { ProjectsService } from '../services/projects';
import { Project } from '@prisma/client';

const projectsService = new ProjectsService();

export class ProjectsController {
  public async get(req: Request, res: Response) {
    try {
      const projects = await projectsService.getAllProjects();
      res.status(200).json({
        status: 'OK',
        data: projects
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };
  
  public async retrieve(req: Request, res: Response) {
    try {
      const { id } = matchedData(req);
      const project = await projectsService.getProjectById(id);
      res.status(200).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async create(req: Request, res: Response) {
    try {
      const body = matchedData(req) as Project;
      const project = await projectsService.createProject(body)

      if (project) {
        const io = req.app.get('io');
        io.emit('new project', project);
      };

      res.status(201).json({
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
      const project = await projectsService.updateProject(id, body as Project);
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
      const project = await projectsService.deleteProject(id);
      res.status(204).json({
        status: 'OK',
        data: project
      });
    } catch (error: any) {
    handleErrorHttp(res, 400, error.message);    
    };
  };
};