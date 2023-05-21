import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { ProjectsController } from '../controllers/projects';
import { bodyValidator, idValidator } from '../validators/projects';
import checkRole from '../middlewares/role';
import apicache from 'apicache';

const router: Router = Router();
const projectsController = new ProjectsController();
const cache = apicache.middleware;

router.get('/', cache('1 minutes'), projectsController.get);
router.post('/', authMiddleware, checkRole, bodyValidator, projectsController.create);
router.get('/:id', cache('1 minutes'), authMiddleware, idValidator, projectsController.retrieve);
router.put('/:id', authMiddleware, checkRole, idValidator, bodyValidator, projectsController.update);
router.delete('/:id', authMiddleware, checkRole, idValidator, projectsController.delete);

export { router };