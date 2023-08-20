import express from 'express';
const app = express()
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: '.env' });

// start database
import connectDatabase from './database';
connectDatabase()

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import user from './routes/userRoute';
app.use('/user', user)

app.get('/', (req, res) => {
    res.send('im fine')
})

const server = app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
})

module.exports = app;