import * as service from '../services/admin.service.js';

export async function createUser(req, res, next){
    try {
        const user = await service.createUser(req.body);
        res.status(201).json(
            {message: "User created successfully", 
            data: user
            }
        );
    } catch (err) { next(err); }
}

export async function getUserById(req, res, next){
    try {
        const user = await service.getUserById(req.params.id);
        res.status(200).json(
            {message: "User fetched successfully", 
            data: user
            }
        );
    } catch (err) { next(err); }
}   