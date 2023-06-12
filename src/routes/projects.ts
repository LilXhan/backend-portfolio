import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { ProjectsController } from '../controllers/projects';
import { bodyValidator, idValidator } from '../validators/projects';
import { checkRole } from '../middlewares/role';
const router: Router = Router();

const projectsController = new ProjectsController();

router.get('/', projectsController.get);
router.post('/', authMiddleware, checkRole, bodyValidator, projectsController.create);
router.get('/:id', authMiddleware, idValidator, projectsController.retrieve);
router.put('/:id', authMiddleware, checkRole, idValidator, bodyValidator, projectsController.update);
router.delete('/:id', authMiddleware, checkRole, idValidator, projectsController.delete);

export { router };