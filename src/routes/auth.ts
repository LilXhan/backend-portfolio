import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { registerValidator, loginValidator } from '../validators/auth';

const router: Router = Router();

const authController = new AuthController();

router.post('/login', loginValidator, authController.login);
router.post('/register', registerValidator, authController.register);

export { router };