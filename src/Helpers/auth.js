import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generateToken(email, id) {
    return jsonwebtoken.sign({ email, id }, process.env.JWT_TOKE_SECRET, { expiresIn: '1h' });
}

export function generateTokenGeneric() {
    console.log(process.env.JWT_TOKE_SECRET)
    // return 'Valor null'
    return jsonwebtoken.sign({ token: 'Acceso generico' }, process.env.JWT_TOKE_SECRET, { expiresIn: '1h' });
}

export function tokenVerification(req, res, next) {
    const token = req.header('AppToken')?.replace('Bearer ', '');
    console.log('Validacion');
    console.log(token);
    if (!token) {
        console.log('Validacion');
        res.status(401).json({ error: 'Application token required.' });
    }
    try {
        console.log('Rntra a try');
        console.log(process.env.JWT_TOKE_SECRET);

        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKE_SECRET);
        console.log(dataToken);
        next();
    } catch (error) {
        console.log(error);

        // res.status(401).json({ error: 'Invalid token.' });
    }
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