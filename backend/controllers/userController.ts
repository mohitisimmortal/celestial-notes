import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Note } from '../models/model';
const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const JWT_SECRET: string = process.env.JWT_SECRET || 'default-secret';
import authenticateToken from '../middlewares/authorize';

// Register a new user
export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ message: 'LoggedIn successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

// Logout (if needed)
export const logout = async (req: Request, res: Response) => {
    try {
        // Perform any logout-related actions if required
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging out' });
    }
};

// Create a new note
export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const userId = req.user!.userId;
        console.log(userId);


        const note = new Note({ title, content, userId });
        await note.save();

        res.status(201).json({ message: 'Note created successfully', note });
    } catch (error) {
        console.error('Error creating note:', error); // Log the error message

        res.status(500).json({ error: 'An error occurred while creating the note' });
    }
};

// Get all notes for a user
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const notes = await Note.find({ userId });

        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
};

// Get a specific note by ID
export const getNoteById = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const userId = req.user!.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ note });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the note' });
    }
};

// Update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const userId = req.user!.userId;

        const { title, content } = req.body;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const userId = req.user!.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await note.deleteOne();

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
};