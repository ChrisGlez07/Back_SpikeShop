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
export async function updateUser(req, res, next){
    try {
        let newInfo ={};
        if(req.body.name) newInfo.name = req.body.name;
        if(req.body.email) newInfo.email = req.body.email;
        if(req.body.password) newInfo.password = req.body.password;

        const user = await service.updateUser(req.body.id, newInfo);
        res.status(201).json(
            {
            message: "User updated successfully", 
            data: user
            }
        );
    }catch (err) { next(err); }
    }

    export async function deleteUser(req, res, next){
        try {
            const userToDelete = req.params.deleteUser;
            const userDeleted = await service.deleteUser(userToDelete);
            res.status(200).json(
                {
                message: "User deleted successfully", 
                data: userDeleted
                }
            );
        } catch (err) { next(err); }
    }   
