import {Request, Response} from "express";
import Profile, {IProfile} from "../models/profile";
import {IncomingForm} from 'formidable'
import * as fs from 'fs'
import {errorHandler} from "../helpers/dbErrorHandler";

export const createProfile = (req: Request, res: Response) => {
    let form = new IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        if(error){
            return res.status(400).json({
                error: {
                    message: 'Image could not be uploaded'
                }
            });
        }

        const { name, bio, email, phone } = fields;
        if (!name || !bio || !email || !phone) {
            return res.status(400).json({
                error: {
                    message: 'All fields are required'
                }
            });
        }
        let profileObj = {...fields};

        if (files.avatar) {
            if (files.avatar.size > 1000000) {
                return res.status(400).json({
                    error: {
                        message: 'Avatar should be less than 1mb in size'
                    }
                });
            }

            profileObj.avatar = {
                // @ts-ignore
                data: fs.readFileSync(files.avatar.path),
                contentType: files.avatar.type
            }
            // product.photo.data = ;
            // product.photo.contentType = files.photo.type;
        }

        if (files.resume) {
            if (files.resume.size > 1000000) {
                return res.status(400).json({
                    error: {
                        message: 'Resume should be less than 1mb in size'
                    }
                });
            }

            profileObj.resume = {
                // @ts-ignore
                data: fs.readFileSync(files.resume.path),
                contentType: files.resume.type
            }
            // product.photo.data = ;
            // product.photo.contentType = files.photo.type;
        }

        let profile = new Profile(profileObj);

        profile.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            result.avatar = undefined;
            result.resume = undefined;
            res.json(result);
        });
    });
}


export const getProfile = async (req: Request, res: Response) => {
    try{
        const result = await Profile.find({}, {avatar: 0, resume: 0});
        res.status(200).json(result)
    }catch (error){
        res.status(400).json({
            message: "Error fetching profile",
            email: req.body.email,
            error
        })
    }
}

export const getAvatar = async (req: Request, res: Response) => {
    try{
        const result = await Profile.find({}, {avatar: 1, _id: 0});
        const firstResult = result[0];
        res.set("Content-Type", firstResult.avatar.contentType);
        res.send(firstResult.avatar.data);
    }catch (error){
        res.status(400).json({
            message: "Something went wrong",
            error
        })
    }
}

export const getResume = async (req: Request, res: Response) => {
    try{
        const result = await Profile.find({}, {resume: 1, _id: 0});
        const firstResult = result[0];
        res.set("Content-Type", firstResult.resume.contentType);
        res.send(firstResult.resume.data);
    }catch (error){
        res.status(400).json({
            message: "Something went wrong",
            error
        })
    }
}