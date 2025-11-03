import * as producto from '../Services/producto.service.js';

export async function createProducto(req, res, next) {  
    try {
        const { nombre, tipo, cantidad, precio } = req.body;
        const newProducto = { nombre, tipo, cantidad, precio };
        const productoCreated = await producto.createProducto(newProducto);
        res.status(201).json({
            message: "Producto creado exitosamente",
            data: productoCreated
        });
    } catch (err) { next(err); }
}

export async function getProductoById(req, res, next){
    try {
        const productoData = await producto.getProductoById(req.params.id);
        res.status(200).json(
            {message: "Producto fetched successfully", 
            data: productoData
            }
        );
    } catch (err) { next(err); }
}
