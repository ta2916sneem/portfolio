
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
import path from 'path';
import morgan from 'morgan';
import connectDB from './database/connection';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override'
import { notFound, errorHandler } from './error_handlers/fallback_error_handler'
import {Request, Response} from "express";

import blogRoutes from './routes/blogs';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import contactRoutes from './routes/contact';
import profileRoutes from './routes/profile';

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
if(process.env.NODE_ENV === 'prod'){
    app.use(morgan('dev'));
}
app.use(cookieParser());

app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);

if(process.env.NODE_ENV === 'dev'){
    app.use(express.static(path.join(__dirname, '../portfolio-react/build')))

    app.get('*', (req:Request, res: Response) =>
      res.sendFile(path.resolve(__dirname ,'..','portfolio-react','build', 'index.html'))
    )
}else if(process.env.NODE_ENV === 'prod'){
    app.use(express.static(path.join(__dirname, '/build')))

    app.get('*', (req:Request, res: Response) =>
        res.sendFile(path.resolve(__dirname ,'build', 'index.html'))
    )
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000;


const startProcess = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} with NODE_ENV=${process.env.NODE_ENV}`);
        })
    }catch (error){
        console.log(error);
    }
}

startProcess()

