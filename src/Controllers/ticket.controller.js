import * as ticketService from "../Service/ticket.service.js";

export const generarTicket = async (req, res) => {
    try {
        const { carritoId } = req.body;

        if (!carritoId) {
            return res.status(400).json({ error: "carritoId is required" });
        }

        const ticket = await ticketService.crearTicketDesdeCarrito(carritoId);

        return res.status(201).json({
            message: "Ticket generated successfully",
            ticket
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const cancelarTicket = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Ticket ID is required" });
        }

        const ticket = await ticketService.cancelarTicket(id);

        return res.status(200).json({
            message: "Ticket canceled successfully",
            ticket
        });

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const obtenerTodosLosTickets = async (req, res) => {
    try {
        const tickets = await ticketService.obtenerTickets();
        return res.status(200).json({
            message: "Tickets retrieved successfully",
            tickets
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const obtenerTicketPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketService.obtenerTicketPorId(id);
        
        return res.status(200).json({
            message: "Ticket retrieved successfully",
            ticket
        });

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const obtenerTicketsPorUsuario = async (req, res) => {
    try {
        const { usuarioEmail } = req.params;
        const tickets = await ticketService.obtenerTicketsPorUsuario(usuarioEmail);
        
        return res.status(200).json({
            message: "User tickets retrieved successfully",
            tickets
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};