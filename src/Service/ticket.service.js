import { Ticket } from "../Models/ticket.model.js";
import { Carrito } from "../Models/carrito.model.js";

export const crearTicketDesdeCarrito = async (carritoId) => {
    const carrito = await Carrito.findOne({ 
        _id: carritoId, 
        estado: 'activo' 
    });
    
    if (!carrito) {
        throw new Error("Cart not found or already processed");
    }

    const ticket = new Ticket({
        carritoId: carrito._id,
        usuarioEmail: carrito.usuarioEmail,
        productos: carrito.productos,
        total: carrito.total,
        estado: "payed"
    });

    await ticket.save();

    await Carrito.findByIdAndUpdate(
        carritoId,
        { estado: 'completado' }
    );

    return ticket;
};

export const cancelarTicket = async (ticketId) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    await Carrito.findByIdAndUpdate(ticket.carritoId, { estado: 'activo' });

    ticket.estado = "canceled";
    await ticket.save();

    return ticket;
};

export const obtenerTickets = async () => {
    return await Ticket.find().populate('carritoId');
};

export const obtenerTicketPorId = async (ticketId) => {
    const ticket = await Ticket.findById(ticketId).populate('carritoId');
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
};

export const obtenerTicketsPorUsuario = async (usuarioEmail) => {
    return await Ticket.find({ usuarioEmail }).populate('carritoId');
};