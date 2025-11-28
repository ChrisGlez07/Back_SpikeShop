import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    carritoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carrito",
        required: true
    },
    usuarioEmail: {
        type: String,
        required: true
    },
    productos: [{
        productoId: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        cantidadComprada: {
            type: Number,
            required: true
        },
        precioUnitario: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        descripcion: {
            type: [{
                color: {
                    type: String,
                    required: true
                },
                talla: {
                    type: String,
                    required: true
                },
                cantidad: {
                    type: Number,
                    required: true
                }
            }],
            required: true
        }
    }],
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