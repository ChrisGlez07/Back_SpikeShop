import * as producto from '../Service/producto.service.js';

export async function createProducto(req, res, next) {  
    try {
        const { nombre, tipo, precio, imagen, descripcion } = req.body;
        if (!descripcion || !Array.isArray(descripcion) || descripcion.length === 0) {
            return res.status(400).json({
                message: "The product description must have at least one color and size combination"
            });
        }

        const newProducto = { nombre, tipo, precio, imagen, descripcion };
        const productoCreated = await producto.createProducto(newProducto);
        
        res.status(201).json({
            message: "Producto created successfully",
            data: productoCreated
        });
    } catch (err) { 
        next(err); 
    }
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
            message: "Productos fetched successfully",
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
        if (newInfo.descripcion && (!Array.isArray(newInfo.descripcion) || newInfo.descripcion.length === 0)) {
            return res.status(400).json({
                message: "The product description must have at least one color and size combination"
            });
        }
        
        const updatedProducto = await producto.updateProducto(id, newInfo);
        res.status(200).json({
            message: "Producto updated successfully", 
            data: updatedProducto
        });
    } catch (err) { 
        next(err); 
    }
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

export async function getProductoByNombre(req, res, next) {
    try {
        const nombre = req.params.nombre;

        const productoData = await producto.getProductoByNombre(nombre);

        res.status(200).json({
            message: "Producto fetched successfully by name",
            data: productoData
        });
    } catch (err) {
        next(err);
    }
}
