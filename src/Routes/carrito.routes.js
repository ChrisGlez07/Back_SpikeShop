// routes/carrito.routes.js

import { Router } from "express";
import { 
    crearCarrito,
    obtenerCarrito,
    obtenerCarritos,
    borrarCarrito
} from "../Controllers/carrito.controller.js";

const router = Router();

// Crear ticket/carrito
router.post("/", crearCarrito);

// Obtener todos los tickets
router.get("/", obtenerCarritos);

// Obtener un ticket por ID
router.get("/:id", obtenerCarrito);

// Borrar ticket
router.delete("/:id", borrarCarrito);

export default router;
