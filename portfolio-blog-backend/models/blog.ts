import {Schema} from "mongoose";
import * as mongoose from 'mongoose';
import {Document, Model} from "mongoose";
import {ITag} from "./tags";

const blogSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            minlength: 6,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            required: true,
            minlength: 50,
            maxlength: 500
        },
        content: {
            type: String,
            minlength: 100,
            required: true,
        },
        publishedOn: {
            type: Date,
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        applauds: {
            type: Number,
            min: 0,
            default: 0
        },
        tags: {
            type: []
        },
        level: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

export interface IBlog extends Document{
    title: string,
    description: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    publishedOn: Date,
    isPublished: boolean,
    applauds: number,
    tags: ITag[],
    level: string
}

const User: Model<IBlog> = mongoose.model("blog", blogSchema);
export default User;