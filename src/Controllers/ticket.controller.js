import * as ticketService from "../Service/ticket.service.js";

export const generarTicket = async (req, res) => {
    try {
        const { carritoId } = req.body;

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
        const ticket = await ticketService.cancelarTicket(req.params.id);

        return res.status(200).json({
            message: "Ticket canceled",
            ticket
        });

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const obtenerTodosLosTickets = async (req, res) => {
    try {
        const tickets = await ticketService.obtenerTickets();
        return res.status(200).json(tickets);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
