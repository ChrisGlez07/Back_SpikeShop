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
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All the fields are recquired (username, email, password)",
            });
        }

        const existingUser = await service.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                message: "The email is already in use",
            });
        }

        const newPassword = await bcrypt.hash(password, 10);

        const data = {
            username,
            email,
            password: newPassword,
            role: role || "user"  
        };


        const user = await service.createUser(data);
        const token = generateToken(user.email, user._id);

        res.status(201).json({
            message: "Userr created successfully",
            redirectTo: "/login",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    password: newPassword,
                    role: user.role
                },
                token
            }
        });

    } catch (err) {
        console.error("Error creating user:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: "The email or username is already in use",
            });
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await service.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user.email, user._id, user.role);

        res.status(200).json({
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (err) {
        next(err);
    }
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
