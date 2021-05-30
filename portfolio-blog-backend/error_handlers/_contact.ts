
export const contactSubmitErrorMessage = (error: any) => {
    if(error.firstName){
        if(error.firstName.kind === 'required'){
            return "First name is a required field"
        }
    }

    if(error.lastName){
        if(error.lastName.kind === 'required'){
            return "Last name is a required field"
        }
    }

    if(error.email){
        if(error.email.kind === 'required'){
            return "email is a required field"
        }
    }

    return "Something went wrong, Please try again"
}