import User, {IUser} from '../models/user';
import * as jwt from 'jsonwebtoken' // To generate signed token
import expressJWT from 'express-jwt';
import {validationResult} from "express-validator";
import {errorHandler} from "../helpers/dbErrorHandler"; // For authorization check
import {NextFunction, Request, Response} from "express";


export const signUp = async (req:Request, res: Response) => {
    const user:IUser = new User(req.body);
    try{
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), user: user});
        }
        await user.save()
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    }catch (error){
        return res.status(400).json({
            message: errorHandler(error),
            error
        });
    }
};

export const signIn = async (req: Request, res: Response) => {
    // Find the user based on email
    User.findOne({email: req.body.email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: `${req.body.email} does not exists`
            });
        }

        // If user found make sure the email and password matches
        // create authenticate method in user model

        if(!user.authenticate(req.body.password)){
            return res.status(401).json({
                error: `Email and password don't match`
            })
        }

        // generate a signed token with user id and secret

        // @ts-ignore
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        // @ts-ignore
        res.cookie('t', token, {expire: Date.now()+9999});
        const {_id, name, email, role} = user;
        return res.json({token, userInfo: {_id, name, email, role}});
    })
}

export const logOut = (req: Request, res: Response) => {
    res.clearCookie('t');
    res.json({message: 'Logout successful'});
}

export const requireSignin = expressJWT({
    secret: ""+process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let user = req.profile && req.auth && req.profile._id == req.auth.id;
    if(!user){
        return res.status(403).json({
            message: "Access denied"
        });
    }
    next();
};

export const isAdmin = (req: Request, res:Response, next:NextFunction) => {
    // @ts-ignore
    if(req.profile.role === 0){
        return res.status(403).json({
            message: "Admin resource, access denied!!"
        })
    }

    next();
};

