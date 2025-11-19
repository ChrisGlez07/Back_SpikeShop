import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generateToken(email, id, role) {
    return jsonwebtoken.sign({ email, id, role }, process.env.JWT_TOKE_SECRET, { expiresIn: '1h' });
}

export function generateTokenGeneric() {
    console.log(process.env.JWT_TOKE_SECRET)
    return jsonwebtoken.sign({ token: 'Access Generic' }, process.env.JWT_TOKE_SECRET, { expiresIn: '1h' });
}

export function tokenVerification(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Validacion token:', token);
    
    if (!token) {
        console.log('Token no proporcionado');
        return res.status(401).json({ error: 'Token must be provided' });
    }
    
    try {
        console.log('Secret key:', process.env.JWT_TOKE_SECRET);
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKE_SECRET);
        console.log('Decoded token:', dataToken);
        req.user = dataToken; 
        next();
    } catch (error) {
        console.log('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

////para chris
export function isAdmin(req, res, next) {
    console.log(req.user.role);

    
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can perform this action" });
    }
    next();
}


export function tokenUserValidation(req, res, next) {
    const AppToken = req.header('AppToken')?.replace('Bearer ', '');
    const UserToken = req.header('UserToken')?.replace('Bearer ', '');
    console.log(AppToken);
    console.log(UserToken);

    if (AppToken === undefined || UserToken === undefined) {
        res.status(403).json({ error: 'Application token required' });
    }

    try {
        const dataAppToken = jsonwebtoken.verify(AppToken, process.env.JWT_TOKE_SECRET);
        console.log(dataAppToken);
        if (!dataAppToken) {
            res.status(403).json({ error: 'Invalid application token.' });
            return;
        }

        const dataUserToken = jsonwebtoken.verify(UserToken, process.env.JWT_TOKE_SECRET);
        console.log(dataUserToken);
        if (!dataUserToken) {
            res.status(403).json({ error: 'Invalid user token.' });
            return;
        }
        console.log(dataAppToken);
        console.log(dataUserToken);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Application token required' });
    }
}

