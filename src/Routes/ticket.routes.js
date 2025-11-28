import { Router } from "express";
import { 
    generarTicket, 
    cancelarTicket, 
    obtenerTodosLosTickets,
    obtenerTicketPorId,
    obtenerTicketsPorUsuario
} from "../Controllers/ticket.controller.js";

const router = Router();

router.post("/", generarTicket);
router.put("/cancelar/:id", cancelarTicket);
router.get("/", obtenerTodosLosTickets);
router.get("/:id", obtenerTicketPorId);
router.get("/usuario/:usuarioEmail", obtenerTicketsPorUsuario);

export default router;