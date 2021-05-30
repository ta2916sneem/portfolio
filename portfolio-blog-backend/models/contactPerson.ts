import {Schema} from "mongoose";
import * as mongoose from 'mongoose';
import {Document, Model} from "mongoose";

const contactSchema: Schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: String,
        message: String,
    },
    {timestamps: true}
);

export interface IContactPerson extends Document{
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    message?: string
}

const Contact: Model<IContactPerson> = mongoose.model("contact", contactSchema, "contacts");
export default Contact;