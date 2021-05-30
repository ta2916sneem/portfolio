import {Schema} from "mongoose";
import * as mongoose from 'mongoose';
import {Document, Model} from "mongoose";

const tagSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
    },
    {timestamps: true}
);

export interface ITag extends Document{
    name: string,
}

const Tags: Model<ITag> = mongoose.model("tags", tagSchema, "tags");
export default Tags;