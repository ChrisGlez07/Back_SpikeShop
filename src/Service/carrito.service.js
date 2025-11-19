// services/carrito.service.js

import { Carrito } from "../Models/carrito.model.js";
import { Producto } from "../Models/producto.model.js";

export const agregarProductoAlCarrito = async (productoId, cantidad) => {
    
    const producto = await Producto.findById(productoId);
    if (!producto) throw new Error("Producto no encontrado");

    // Snapshot del producto
    const itemCarrito = {
        productoId: producto._id,
        nombre: producto.nombre,
        tipo: producto.tipo,
        cantidadComprada: cantidad,
        precioUnitario: producto.precio,
        imagen: producto.imagen
    };

    const total = cantidad * producto.precio;

    const carrito = new Carrito({
        productos: [itemCarrito],
        total
    });

    await carrito.save();

    return carrito;
};


export const obtenerCarritoPorId = async (id) => {
    const carrito = await Carrito.findById(id);
    if (!carrito) throw new Error("Carrito no encontrado");
    return carrito;
};


export const obtenerTodosLosCarritos = async () => {
    return await Carrito.find();
};


export const eliminarCarrito = async (id) => {
    const carrito = await Carrito.findByIdAndDelete(id);
    if (!carrito) throw new Error("Carrito no encontrado");
    return carrito;
};
