"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = (_a = process.env.MONGO_DB_URI) !== null && _a !== void 0 ? _a : 'default-mongodb-uri';
// Connect to MongoDB
const connectDatabase = () => {
    mongoose_1.default.connect(mongoUri);
};
exports.default = connectDatabase;
