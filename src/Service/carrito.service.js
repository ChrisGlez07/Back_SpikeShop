// services/carrito.service.js

import { Carrito } from "../Models/carrito.model.js";
import { Producto } from "../Models/producto.model.js";

export const crearCarritoCompleto = async (usuarioEmail, productos, total) => {
    
    const carrito = new Carrito({
        usuarioEmail,
        productos,
        total
    });

    await carrito.save();
    return carrito;
};

// FUNCIÓN MODIFICADA: Agregar un solo producto al carrito SIN validación estricta
export const agregarProductoAlCarrito = async (productoId, cantidad) => {
    // Intentar buscar el producto, pero si no existe, crear el carrito igual
    let producto = null;
    try {
        producto = await Producto.findById(productoId);
    } catch (error) {
        // Si hay error de casteo (ObjectId inválido), continuar sin producto
        console.log("Producto no encontrado en DB, usando datos proporcionados");
    }

    const itemCarrito = {
        productoId: productoId,
        nombre: producto ? producto.nombre : "Producto del carrito",
        tipo: producto ? producto.tipo : "General",
        cantidadComprada: cantidad,
        precioUnitario: producto ? producto.precio : 0,
        imagen: producto ? producto.imagen : ""
    };

    const total = cantidad * itemCarrito.precioUnitario;

    const carrito = new Carrito({
        productos: [itemCarrito],
        total
    });

    await carrito.save();
    return carrito;
};

// ... mantén las otras funciones existentes
export const obtenerCarritoPorId = async (carritoId) => {
    const carrito = await Carrito.findById(carritoId);
    if (!carrito) throw new Error("Carrito no encontrado");
    return carrito;
};

export const obtenerTodosLosCarritos = async () => {
    return await Carrito.find();
};

export const eliminarCarrito = async (carritoId) => {
    const carrito = await Carrito.findByIdAndDelete(carritoId);
    if (!carrito) throw new Error("Carrito no encontrado");
    return carrito;
};