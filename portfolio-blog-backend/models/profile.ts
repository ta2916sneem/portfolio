import {Schema} from "mongoose";
import * as mongoose from 'mongoose';
import {Document, Model} from "mongoose";

const profileSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Raiyan Razi",
            required: true
        },
        email: {
            type: String,
            default: "raiyanrazi3357@gmail.com",
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        alternatePhone: {
            type: String
        },
        bio: {
            type:String,
            required: true
        },
        avatar: {
            data: Buffer,
            contentType: String
        },
        resume: {
            data: Buffer,
            contentType: String
        },
    },
    {timestamps: true, capped: { size: 3097152 , max: 1, autoIndexId: true }}
);

export interface IProfile extends Document{
    name: string,
    email: string,
    phone: string,
    alternatePhone?: string,
    bio: string,
    avatar: any,
    resume: any,
    createdAt?: Date,
    updatedAt?: Date,
}

const Profile: Model<IProfile> = mongoose.model("profile", profileSchema, "profiles");
export default Profile;