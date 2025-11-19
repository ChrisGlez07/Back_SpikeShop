import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    carritoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true
    },
    productos: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ["payed", "canceled"],
        default: "payed"
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("ticket", ticketSchema);

export { Ticket };
