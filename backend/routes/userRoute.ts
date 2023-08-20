import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, login, signup, updateNote } from '../controllers/userController';
import authenticateToken from '../middlewares/authorize';

const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/getallnotes').get(authenticateToken, getAllNotes)
router.route('/getsinglenote/:id').get(authenticateToken, getNoteById)
router.route('/createnote').post(authenticateToken, createNote)
router.route('/updatenote/:id').put(authenticateToken, updateNote)
router.route('/deletenote/:id').delete(authenticateToken, deleteNote)

export default router;