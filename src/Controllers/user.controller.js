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