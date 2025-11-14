import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
        unique: true,
        lowercase: true,
        trim: true  
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    descripcion: {
        type: [{
            color: {
                type: String,
                required: true,
                enum: ['rojo', 'azul', 'negro']
            },
            talla: {
                type: String,
                required: true,
                enum: ['CH', 'M', 'G', 'XL']
            },
            cantidad: {
                type: Number,
                required: true,
                min: 0
            }
        }],
        required: true,
        validate: {
            validator: function(descripciones) {
                return descripciones.length > 0;
            },
            message: 'El producto debe tener al menos una combinación de color y talla'
        }
    }
}, {
    timestamps: true
});

productoSchema.index({ nombre: 1, tipo: 1 });
productoSchema.index({ "descripcion.color": 1, "descripcion.talla": 1 });

const Producto = mongoose.model("producto", productoSchema);
export { Producto };