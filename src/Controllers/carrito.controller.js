// controllers/carrito.controller.js

import * as carritoService from "../Service/carrito.service.js";

export const crearCarrito = async (req, res) => {
    try {
        const { productoId, cantidad } = req.body;

        const carrito = await carritoService.agregarProductoAlCarrito(productoId, cantidad);

        return res.status(201).json({
            message: "Carrito creado exitosamente",
            carrito
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


export const obtenerCarrito = async (req, res) => {
    try {
        const carrito = await carritoService.obtenerCarritoPorId(req.params.id);

        return res.status(200).json(carrito);

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};


export const obtenerCarritos = async (req, res) => {
    try {
        const carritos = await carritoService.obtenerTodosLosCarritos();
        return res.status(200).json(carritos);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const borrarCarrito = async (req, res) => {
    try {
        const carrito = await carritoService.eliminarCarrito(req.params.id);

        return res.status(200).json({
            message: "Carrito eliminado",
            carrito
        });

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};
