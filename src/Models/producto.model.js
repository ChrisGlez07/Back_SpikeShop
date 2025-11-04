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
    },
    tipo: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true, 
    },
    precio: {
        type: Number,
        required: true,
    },
    imagen:{
        type: String,
        required: true,
    }
});
productoSchema.index({ nombre: 1, tipo: 1 });
const Producto = mongoose.model("producto", productoSchema);
export { Producto };