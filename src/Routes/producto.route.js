import * as controller from '../Controllers/producto.controller.js';
import * as controlleru from '../Controllers/user.controller.js';
import { Router } from 'express';
import { tokenUserValidation, tokenVerification } from '../Helpers/auth.js';
const router = Router();

//admin
router.get('/:id', tokenUserValidation, controlleru.getUserById);
router.patch('/update', tokenUserValidation, controlleru.updateUser);
router.delete('/delete/:id', tokenUserValidation, controlleru.deleteUser);

//productos
router.post('/create', tokenVerification, controller.createProducto);

export default router;


