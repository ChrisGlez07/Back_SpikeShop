import express from 'express';
import { User} from '../Models/user.model.js';

export async function createUser(data){
    const exist = await User.findOne({ id: data.id });
    if(exist != null){
        const error = new Error("User already exists");
        error.status = 409;
        throw error;
    }
    const user = await User.create(data);
    return user.toObject();
}

export async function getUserById(id){
   const exist = await User.findOne({id:id});
    return exist;
}

export async function updateUser(id, newInfo){
     const exists = await User.findOneAndUpdate({id:id}, newInfo);
    return exists;
}

export async function deleteUser(id){  
    const exist = await User.findOneAndDelete({id:id});
    return exist;
}

export async function getUserByEmailOrUsername(email, username) {
    try {
        return await User.findOne({
            $or: [{ email }, { username }]
        });
    } catch (error) {
        throw error;
    }
}

export async function getUserByEmail(email) {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw error;
    }
}