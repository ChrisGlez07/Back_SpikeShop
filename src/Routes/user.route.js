import * as controller from '../Controllers/user.controller.js';
import { Router } from 'express';
import { tokenUserValidation, tokenVerification, isAdmin } from '../Helpers/auth.js';
const router = Router();

router.get('/token/generic', controller.getGenericToken);

router.post('/register', tokenVerification, controller.createUser);
router.post('/login', tokenVerification, controller.login); 

//admin
router.get('/:id', tokenUserValidation, isAdmin, controller.getUserById);
router.patch('/update', tokenUserValidation, isAdmin, controller.updateUser);
router.delete('/delete/:id', tokenUserValidation, isAdmin ,controller.deleteUser);


export default router;