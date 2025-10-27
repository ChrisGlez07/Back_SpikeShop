import * as controller from '../Controllers/user.controller.js';
import { Router } from 'express';
const router = Router();

router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);
router.patch('/update', controller.updateUser);
router.delete('/delete/:id', controller.deleteUser);


export default router;