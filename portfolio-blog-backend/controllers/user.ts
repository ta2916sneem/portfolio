import User from '../models/user';
import {Request, Response, NextFunction} from "express";

// middleware
// this will attach user profile in req.profile field
// and will make it available for all routes
export const userById = async (req: Request, res: Response, next: NextFunction, id: any) => {
    try{
        console.log(id);
        // @ts-ignore
        req["profile"] = await User.findById(id);
        next();
    }catch (error){
        return res.status(400).json({
            message: "User not found"
        })
    }
};

export const userByEmail = async (req: Request, res: Response) => {
    console.log(req.body.email);
    try{
        const user = await User.find({email: req.body.email});
        res.status(200).json(user);
    }catch (error){
        res.status(400).json({
            message: "Error fetching user by email",
            email: req.body.email,
            error
        })
    }
}

export const read = (req:Request, res: Response) => {
    // @ts-ignore
    req.profile.hashed_password = undefined;
    // @ts-ignore
    req.profile.salt = undefined;
    // @ts-ignore
    return res.status(200).json(req.profile);
}

export const update = (req: Request, res: Response) => {
    // @ts-ignore
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {
        if(err){
            return res.status(400).json({
                message: "You are not authorized to perform this action"
            });
        }
        user!.hashed_password = undefined;
        user!.salt = undefined;
        res.status(200).json(user);
    })
}