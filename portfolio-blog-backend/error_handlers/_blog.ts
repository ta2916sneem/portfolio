
export const uploadErrorMessage = (error: any) => {
    if(error.title){
        if(error.title.kind === 'minlength'){
            return `Title must be of length ${error.title.properties ? error.title.properties.minlength : "6"}`
        }
        if(error.title.kind === 'required'){
            return "Title is a required field"
        }
    }

    if(error.description){
        if(error.description.kind === 'minlength'){
            return `Description must be of length ${error.description.properties ? error.description.properties.minlength : "6"}`
        }
        if(error.description.kind === 'required'){
            return "Description is a required field"
        }
    }

    if(error.content){
        if(error.content.kind === 'minlength'){
            return `Content must be of length ${error.content.properties ? error.content.properties.minlength : "100"}`
        }
        if(error.content.kind === 'required'){
            return "You must write some content before submitting"
        }
    }

    if(error.level){
        if(error.level.kind === 'required'){
            return "Please provide a difficulty level"
        }
    }

    if(error.kind === "ObjectId"){
        return "Please make sure _id is valid"
    }

    return "Something went wrong";
}
