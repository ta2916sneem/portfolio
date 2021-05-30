import * as mongoose from 'mongoose';
const {v4: uuidv4} = require('uuid');
import * as crypto from 'crypto';
import {Document, Model} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32
    },

    hashed_password: {
        type: String,
        required: true,
    },

    about: {
        type: String,
        trim: true,
    },

    salt: String,

    role: {
        type: Number,
        default: 0
    },

    history: {
        type: Array,
        default: []
    },

}, {timestamps: true});

// Virtual Field
userSchema.virtual('password')
    .set(function (password:string){
        // @ts-ignore
        this._password = password;
        // @ts-ignore
        this.salt = uuidv4();
        // @ts-ignore
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function (){
        // @ts-ignore
        return this._password;
    });

userSchema.methods = {

    authenticate: function(plainText: string){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password: string){
        if(!password){
            return;
        }
        try{
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch(err){
            console.log("Error hashing password");
            return '';
        }
    }
};

export interface IUser extends Document{
    name: string,
    email: string,
    hashed_password?: string,
    about: string,
    salt?: string,
    role: number,
    history: [],
    authenticate(plainText: string): boolean
}

const User: Model<IUser> = mongoose.model("Users", userSchema);

export default User;