import mongoose from "mongoose";

const carritoProductoSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "producto",
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
    }
});

const carritoSchema = new mongoose.Schema({
    usuarioEmail: {
        type: String,
        ref: "Usuarios",
        refPath: "email",
        required: true
    },
    
    productos: [carritoProductoSchema],

    total: {
        type: Number,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }
});

const Carrito = mongoose.model("carrito", carritoSchema);

export { Carrito };