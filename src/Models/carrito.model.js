import mongoose from "mongoose";

const carritoProductoSchema = new mongoose.Schema({
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
});

const carritoSchema = new mongoose.Schema({
  // ID único para el carrito completo
  carritoId: {
    type: String,
    unique: true,
    default: () => `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
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
  },
  
  // Estado del carrito (activo, completado, abandonado)
  estado: {
    type: String,
    enum: ['activo', 'completado', 'abandonado'],
    default: 'activo'
  }
});

const Carrito = mongoose.model("carrito", carritoSchema);

export { Carrito };