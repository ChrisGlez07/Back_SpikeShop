import { Router } from "express";
import { 
    generarTicket, 
    cancelarTicket, 
    obtenerTodosLosTickets 
} from "../Controllers/ticket.controller.js";

const router = Router();

router.post("/", generarTicket);

router.put("/cancelar/:id", cancelarTicket);

router.get("/", obtenerTodosLosTickets);

export default router;
