import crypto from 'crypto';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import path from "path";
import {mongoURI} from '../database/connection';
import {Request, Response} from "express";

export const gfs = Grid(mongoose.connection.db, mongoose.mongo);
gfs.collection('uploads')

export const allFiles = async (req: Request, res: Response) => {
    gfs.files.find().toArray((err:any, files: any) => {
        if(err){
            return res.status(400).json({
                message: "Error fetching file",
                error: err
            })
        }

        if(!files || files.length === 0){
            return res.status(400).json({
                message: "No file exists"
            });
        }
        return res.json(files)
    });
}

export const fileByName = async (req: Request, res: Response) => {

    gfs.files.findOne({filename: req.params.filename}, (err: any, file: any) => {
        if(err){
            return res.status(400).json({
                message: "Error fetching file",
                error: err
            })
        }

        if(!file || file.length === 0){
            return res.status(400).json({
                message: "No file exists"
            });
        }
        return res.json(file)
    });
}

export const singleImage = async (req: Request, res: Response) => {
    gfs.files.findOne({filename: req.params.filename}, (err: any, file: any) => {
        if(err){
            return res.status(400).json({
                message: "Error fetching file",
                error: err
            })
        }
        if(!file || file.length === 0){
            return res.status(400).json({
                message: "No file exists"
            });
        }
        if(file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'application/pdf'){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                message: "Not an image"
            })
        }
    });
}

export const resumeDownload = async (req: Request, res: Response) => {
    gfs.files.findOne({filename: req.params.filename}, (err: any, file: any) => {
        if(err){
            return res.status(400).json({
                message: "Error fetching file",
                error: err
            })
        }
        if(!file || file.length === 0){
            return res.status(400).json({
                message: "No file exists"
            });
        }
        if(file.contentType === 'application/pdf'){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                message: "Not an file"
            })
        }
    });
}

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req: Request, file: any) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

const storageResume = new GridFsStorage({
    url: mongoURI,
    file: (req: Request, file: any) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            const filename = "raiyan_razi_resume.pdf"
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

// @ts-ignore
export const uploadResume = multer({ storageResume });


export default upload;

