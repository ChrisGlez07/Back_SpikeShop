import * as controller from '../Controllers/user.controller.js';
import { Router } from 'express';
import { tokenUserValidation, tokenVerification, isAdmin } from '../Helpers/auth.js';
const router = Router();

router.get('/token/generic', controller.getGenericToken);

router.post('/register', tokenVerification, controller.createUser);
router.post('/login', tokenVerification, controller.login); 

//admin
router.get('/', tokenVerification, controller.getAllUsers);
router.get('/:id', tokenVerification, controller.getUserById);
router.patch('/update', tokenVerification, controller.updateUser);
router.delete('/delete/:id', tokenVerification, controller.deleteUser);


export default router;