import * as service from '../Service/user.service.js';
import { generateToken, generateTokenGeneric } from '../Helpers/auth.js';
import bcrypt from 'bcrypt';

export function getGenericToken(req, res) {
    try {
        const token = generateTokenGeneric();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error generating generic token' });
    }
}

export async function createUser(req, res, next) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son requeridos (username, email, password)",
            });
        }
        const newPasswrod = await bcrypt.hash(password, 10);
        const data = {
            username,
            email,
            password: newPasswrod
        }
        const user = await service.createUser(data);
        const token = generateToken(user.email, user._id);

        res.status(201).json({
            message: "User created successfully",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    password: newPasswrod
                },
                token
            }
        });
    } catch (err) { console.log(err)}
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await service.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: "Credenciales inválidas",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Credenciales inválidas",
            });
        }

        const token = generateToken(user.email, user._id);

        res.status(200).json({
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            }
        });
    } catch (err) { next(err); }
}



export async function getUserById(req, res, next) {
    try {
        const user = await service.getUserById(req.params.id);
        res.status(200).json(
            {
                message: "User fetched successfully",
                data: user
            }
        );
    } catch (err) { next(err); }
}
export async function updateUser(req, res, next) {
    try {
        let newInfo = {};
        if (req.body.name) newInfo.name = req.body.name;
        if (req.body.email) newInfo.email = req.body.email;
        if (req.body.password) newInfo.password = req.body.password;

        const user = await service.updateUser(req.body.id, newInfo);
        res.status(201).json(
            {
                message: "User updated successfully",
                data: user
            }
        );
    } catch (err) { next(err); }
}

export async function deleteUser(req, res, next) {
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
