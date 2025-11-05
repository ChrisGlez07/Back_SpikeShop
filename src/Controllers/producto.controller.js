import * as producto from '../Service/producto.service.js';

export async function createProducto(req, res, next) {  
    try {
        const { nombre, tipo, cantidad, precio, imagen } = req.body;
        const newProducto = { nombre, tipo, cantidad, precio, imagen };
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

export async function getProducto(req, res, next) {
    try {
        const productos = await producto.getProducto();
        console.log(productos);
        res.status(200).json({
            message: "Productos obtenidos exitosamente",
            data: productos,
            count: productos.length
        });
    } catch (err) {
        next(err);
    }
}

export async function updateProducto(req, res, next){
    try {
        const { id, ...newInfo } = req.body;
        const updatedProducto = await producto.updateProducto(id, newInfo);
        res.status(200).json({
            message: "Producto updated successfully", 
            data: updatedProducto
        });
    } catch (err) { next(err); }
}

export async function deleteProducto(req, res, next){
    try {
        const productoToDelete = req.body.id;
        const deletedProducto = await producto.deleteProducto(productoToDelete);
        res.status(200).json({
            message: "Producto deleted successfully",
            data: deletedProducto
        });
    } catch (err) { next(err); }
}
