import { ProjectsService } from '../services/projects';
import { ICreateProject, IByID, IUpdateProject } from '../types/project.type';
import { IRequest } from '../types/request.type';
import { authMiddlewareGraphql } from '../middlewares/auth';
import { checkRoleGraphql } from '../middlewares/role';

const projectsService = new ProjectsService();

export const getProjects = async () => {
  return await projectsService.getAllProjects();
};

export const getProject = async (_: any, { id }: IByID, { req, res }: IRequest) => {
  const user = await authMiddlewareGraphql(req, res);
  const result = checkRoleGraphql(user, res);
  if (result === 'ok') {
    return await projectsService.getProjectById(id);
  }
};

export const createProject = async (_: any, { dto }: ICreateProject, { req, res }: IRequest) => {
  const user = await authMiddlewareGraphql(req, res);
  const result = checkRoleGraphql(user, res);
  if (result === 'ok') {
    return await projectsService.createProject(dto as any);
  }
};

export const deleteProject = async (_: any, { id }: IByID, { req, res }: IRequest) => {
  const user = await authMiddlewareGraphql(req, res);
  const result = checkRoleGraphql(user, res);
  if (result === 'ok') {
    return await projectsService.deleteProject(id);
  }
};

export const updateProject = async (_: any, { idProject, dto }: IUpdateProject, { req, res }: IRequest) => {
  const user = await authMiddlewareGraphql(req, res);
  const result = checkRoleGraphql(user, res);
  if (result === 'ok') {
    return await projectsService.updateProject(idProject, dto as any);
  }
};