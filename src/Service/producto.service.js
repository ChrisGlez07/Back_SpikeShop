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
