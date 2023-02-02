import express, { query } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoute from './routes/todoRoute.js';
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


// SEETING UP THE SERVER

const PORT = process.env.PORT || 5000;

// CONNECTING THE DATABASE
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},

() => console.log('connected to the database'));

// CREATING THE ROUTES
app.use('/', todoRoute);


// LISTENING TO THE SERVER

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
});