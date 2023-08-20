import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY: string | undefined = process.env.JWT_SECRET;

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string }; // Adjust the type structure as needed
        }
    }
}

// Middleware to validate token and set req.user
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; // Extract token

    if (!token) {
        res.status(401).json({ error: 'Unauthorized: Token not provided' });
        return;
    }

    if (!SECRET_KEY) {
        res.status(500).json({ error: 'Internal server error: JWT secret key not configured' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
        req.user = decodedToken as { userId: string }; // Update the payload structure if needed
        next();
    });
};

export default authenticateToken;