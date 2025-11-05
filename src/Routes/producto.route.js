import * as controller from '../Controllers/producto.controller.js';
import * as controllerUser from '../Controllers/user.controller.js';
import { Router } from 'express';
import { tokenUserValidation, tokenVerification } from '../Helpers/auth.js';
const router = Router();

//admin
router.get('/producto/:id', tokenUserValidation, controllerUser.getUserById);
router.patch('/producto/update', tokenUserValidation, controllerUser.updateUser);
router.delete('/producto/delete/:id', tokenUserValidation, controllerUser.deleteUser);

//productos
router.post('/createProducto', tokenVerification, controller.createProducto);
router.get('/producto/:id', tokenVerification, controller.getProductoById);
router.get('/items', tokenVerification, controller.getProducto);
router.patch('/updateProducto', tokenVerification, controller.updateProducto);
router.delete('/deleteProducto', tokenVerification, controller.deleteProducto);
export default router;


