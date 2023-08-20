import mongoose from 'mongoose';
const mongoUri = process.env.MONGO_DB_URI ?? 'default-mongodb-uri';

// Connect to MongoDB
const connectDatabase = () => {
    mongoose.connect(mongoUri);
}

export default connectDatabase;