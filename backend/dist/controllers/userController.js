"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../models/model");
const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
// Register a new user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = yield model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Create a new user
        const user = new model_1.User({ username, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: 'Registered successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});
exports.signup = signup;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield model_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Check the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ message: 'LoggedIn successfully', token });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});
exports.login = login;
// Logout (if needed)
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Perform any logout-related actions if required
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while logging out' });
    }
});
exports.logout = logout;
// Create a new note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;
        console.log(userId);
        const note = new model_1.Note({ title, content, userId });
        yield note.save();
        res.status(201).json({ message: 'Note created successfully', note });
    }
    catch (error) {
        console.error('Error creating note:', error); // Log the error message
        res.status(500).json({ error: 'An error occurred while creating the note' });
    }
});
exports.createNote = createNote;
// Get all notes for a user
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const notes = yield model_1.Note.find({ userId });
        res.status(200).json({ notes });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
});
exports.getAllNotes = getAllNotes;
// Get a specific note by ID
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId;
        const note = yield model_1.Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ note });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the note' });
    }
});
exports.getNoteById = getNoteById;
// Update a note by ID
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId;
        const { title, content } = req.body;
        const note = yield model_1.Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        note.title = title;
        note.content = content;
        yield note.save();
        res.status(200).json({ message: 'Note updated successfully', note });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
});
exports.updateNote = updateNote;
// Delete a note by ID
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId;
        const note = yield model_1.Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        yield note.deleteOne();
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
});
exports.deleteNote = deleteNote;
