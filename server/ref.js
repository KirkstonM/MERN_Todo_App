import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import express from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {registerUser} from './controls/authentication.js';
import user from './models/user.js';

//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//create a public folder with an item folder
app.use("/items", express.static(path.join(__dirname, "public/items")));

// MULTER STORAGE/UPLOAD SAVES FILES TO ITEMS FOLDER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/items");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  app.post('/auth/register', upload.single('picture'), registerUser); //upload picture locally into our public items folder

//   CONNECTING TO MONGODB

const PORT = process.env.PORT || 3001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
},
() => console.log('connected to database'));

app.get('/todo', (req, res) => {
    user.find({}, (err, result) => {
        if(err){
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

//RUNNING THE BACKEND
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})