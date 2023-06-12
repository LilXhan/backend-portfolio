import { Router } from 'express';
import upload from '../utils/upload';
import { authMiddleware } from '../middlewares/auth';
import { checkRole } from '../middlewares/role';
import StorageController from '../controllers/storage';

const router: Router = Router();
const storageController = new StorageController();  

router.post('/upload', authMiddleware, checkRole, upload.single('img'), storageController.create);

export { router };