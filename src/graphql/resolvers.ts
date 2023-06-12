import { getProjects, createProject, deleteProject, getProject, updateProject } from './projects.resolvers'
import { login, register } from './auth.resolvers';
import { RegularExpression } from 'graphql-scalars';

const RoleType = new RegularExpression('RoleType', /^[a-zA-Z0-9]{3,4}$/)

const resolvers = {
  Query: {
    projects: getProjects,
    project: getProject
  },
  Mutation: {
    login,
    register,
    // Projects
    addProject: createProject,
    deleteProject,
    updateProject
  },
  RoleType
}

export default resolvers;