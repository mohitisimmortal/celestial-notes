import { Schema, Document, model } from 'mongoose';

// User Schema interface
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// Note Schema interface
interface INote extends Document {
    title: string;
    content: string;
    userId: string; // Reference to the User who created the note
}

// User Schema
const userSchema = new Schema<IUser>({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Note Schema
const noteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
});

const User = model<IUser>('User', userSchema);
const Note = model<INote>('Note', noteSchema);

export { User, Note };