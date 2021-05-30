import * as express from 'express';
import {Request, Response} from "express";

const imageUploadRouter = express.Router();
import upload, {allFiles, fileByName, singleImage, uploadResume, resumeDownload} from '../controllers/imageUploader'

imageUploadRouter.post("/image", upload.single('file'), (req: any, res:Response) => {
    res.json({
        file: req.file
    })
});

imageUploadRouter.post("/resume", uploadResume.single('file'), (req: any, res:Response) => {
    res.json({
        file: req.file
    })
});

imageUploadRouter.get("/allFiles", allFiles);
imageUploadRouter.get('/singleImageInfo/:filename', fileByName);
imageUploadRouter.get('/singleImage/:filename', singleImage);
imageUploadRouter.get('/resume/:filename', resumeDownload);

export default imageUploadRouter;