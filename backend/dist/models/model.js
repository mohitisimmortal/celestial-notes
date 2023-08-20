"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.User = void 0;
const mongoose_1 = require("mongoose");
// User Schema
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
// Note Schema
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
const Note = (0, mongoose_1.model)('Note', noteSchema);
exports.Note = Note;
