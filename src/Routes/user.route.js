import * as controller from '../Controllers/user.controller.js';
import { Router } from 'express';
const router = Router();

router.post('/', controller.createUser);

export default router;