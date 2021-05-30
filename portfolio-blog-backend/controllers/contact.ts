import {Request, Response} from "express";
import {contactSubmitErrorMessage} from "../error_handlers/_contact";
import Contact, {IContactPerson} from "../models/contactPerson";

export const contactSubmit = async (req: Request, res: Response) => {
    const contactPerson: IContactPerson = new Contact(req.body);
    try{
        const result = await contactPerson.save();
        res.status(201).json({
            result
        });
    }catch (error){
        if(error.errors){
            return res.status(400).json({
                message: contactSubmitErrorMessage(error.errors),
                error
            });
        }else{
            return res.status(400).json({
                message: "Something went wrong",
                error
            });
        }
    }
}