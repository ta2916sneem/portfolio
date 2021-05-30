"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = (error: any) => {
    let output;
    console.log(error.message);
    try {
        if(error.message.includes("dup key") && error.message.includes("email")){
            output = "Email already exists"
        }
    } catch (ex) {
        output = "Unique field already exists";
    }

    return output;
};

/**
 * Get the erroror message from error object
 */
export const errorHandler = (error: any) => {
    let message: string | undefined = "";

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }

    return message;
};