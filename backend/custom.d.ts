import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string }; // Adjust the user property type as needed
        }
    }
}
