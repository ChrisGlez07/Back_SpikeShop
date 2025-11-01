import * as controller from '../Controllers/user.controller.js';
import { Router } from 'express';
import { tokenUserValidation, tokenVerification } from '../Helpers/auth.js';
const router = Router();

router.get('/token/generic', controller.getGenericToken);

router.post('/register', tokenVerification, controller.createUser);
router.post('/login', tokenVerification, controller.login); 

router.get('/:id', tokenUserValidation, controller.getUserById);
router.patch('/update', tokenUserValidation, controller.updateUser);
router.delete('/delete/:id', tokenUserValidation, controller.deleteUser);


export default router;