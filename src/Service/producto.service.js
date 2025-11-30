import express from 'express';
import { Producto} from '../Models/producto.model.js';

export async function createProducto(data){
    const exist = await Producto.findOne({ id: data.id });
    if(exist != null){
        const error = new Error("Producto already exists");
        error.status = 409;
        throw error;
    }

    const producto = new Producto(data);
    await producto.save();
    return producto;
}

export async function getProductoById(id){
   const exist = await Producto.findOne({id: id});
   if (!exist) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
    }
    return exist;
}

export async function getProducto(){
   const exist = await Producto.find();
    return exist;
}

export async function updateProducto(id, newInfo){
     const exists = await Producto.findOneAndUpdate(
         {id: id}, 
         newInfo, 
         { 
             new: true, 
             runValidators: true
         }
     );
     
     if (!exists) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
    }
    
    return exists;
}

export async function deleteProducto(id){  
    const exist = await Producto.findOneAndDelete({id:id});
    return exist;
}   

export async function getProductoByNombre(nombre){
    const exist = await Producto.findOne({ nombre: nombre });

    if (!exist) {
        const error = new Error("Producto no encontrado por nombre");
        error.status = 404;
        throw error;
    }

    return exist;
}