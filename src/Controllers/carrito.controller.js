import * as carritoService from "../Service/carrito.service.js";

export const crearCarrito = async (req, res) => {
    try {
        const { usuarioEmail, productos, total, productoId, cantidad } = req.body;

        if (usuarioEmail && productos && total !== undefined) {
            const carrito = await carritoService.crearCarritoCompleto(
                usuarioEmail, 
                productos, 
                total
            );

            return res.status(201).json({
                success: true, // ← Agregar esta propiedad
                message: "Carrito creado exitosamente",
                data: { // ← Cambiar "carrito" por "data" con estructura específica
                    _id: carrito._id,
                    carritoId: carrito.carritoId, // ← Incluir el carritoId
                    usuarioEmail: carrito.usuarioEmail,
                    total: carrito.total,
                    productos: carrito.productos,
                    estado: carrito.estado,
                    fecha: carrito.fecha
                }
            });
        }
    
        else if (productoId && cantidad !== undefined) {
            const carrito = await carritoService.agregarProductoAlCarrito(productoId, cantidad);

            return res.status(201).json({
                success: true,
                message: "Carrito creado exitosamente",
                data: {
                    _id: carrito._id,
                    carritoId: carrito.carritoId,
                    usuarioEmail: carrito.usuarioEmail,
                    total: carrito.total,
                    productos: carrito.productos,
                    estado: carrito.estado,
                    fecha: carrito.fecha
                }
            });
        }
        
        else {
            return res.status(400).json({ 
                success: false,
                error: "Estructura de datos inválida. Se espera {usuarioEmail, productos, total} o {productoId, cantidad}" 
            });
        }

    } catch (error) {
        return res.status(400).json({ 
            success: false,
            error: error.message 
        });
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

export const obtenerCarritosUsuario = async (req, res) => {
    try {
        const { usuarioEmail } = req.params;
        const carritos = await carritoService.obtenerCarritosPorUsuario(usuarioEmail);
        
        return res.status(200).json(carritos);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const actualizarCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const { productos, total } = req.body;

        const carrito = await carritoService.actualizarCarrito(id, productos, total);

        return res.status(200).json({
            message: "Carrito actualizado exitosamente",
            carrito
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};