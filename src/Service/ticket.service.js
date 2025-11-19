import { Ticket } from "../Models/ticket.model.js";
import { Carrito } from "../Models/carrito.model.js";

export const crearTicketDesdeCarrito = async (carritoId) => {
    const carrito = await Carrito.findById(carritoId);
    if (!carrito) throw new Error("Cart not found");

    const ticket = new Ticket({
        carritoId: carrito._id,
        productos: carrito.productos,
        total: carrito.total,
        estado: "payed"
    });

    await ticket.save();

    return ticket;
};

export const cancelarTicket = async (ticketId) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    ticket.estado = "canceled";
    await ticket.save();

    return ticket;
};

export const obtenerTickets = async () => {
    return await Ticket.find();
};
