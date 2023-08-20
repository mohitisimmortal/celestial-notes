"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET;
// Middleware to validate token and set req.user
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization; // Extract token
    if (!token) {
        res.status(401).json({ error: 'Unauthorized: Token not provided' });
        return;
    }
    if (!SECRET_KEY) {
        res.status(500).json({ error: 'Internal server error: JWT secret key not configured' });
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
        req.user = decodedToken; // Update the payload structure if needed
        next();
    });
};
exports.default = authenticateToken;
