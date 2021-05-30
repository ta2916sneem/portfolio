import {IAction} from "../../types/action";

import {
    CONTACT_SUBMIT_DESTROY_ERROR,
    CONTACT_SUBMIT_FAIL,
    CONTACT_SUBMIT_REQUEST,
    CONTACT_SUBMIT_SUCCESS
} from "../constants/contactConstants";
import {IContactState} from "../../types/contactPerson";


const initialContactState: IContactState = {
    contactSubmitting: false,
    contactSuccess: false,
    contactError: false
}

export const contactSubmitReducer = (state:IContactState=initialContactState, action: IAction):IContactState => {
    switch (action.type){
        case CONTACT_SUBMIT_REQUEST:
            return {...state, contactSubmitting: true}
        case CONTACT_SUBMIT_SUCCESS:
            return {contactSubmitting: false, contactSuccess: true, contactError: false}
        case CONTACT_SUBMIT_FAIL:
            return {...state, contactSubmitting: false, contactError: action.payload}
        case CONTACT_SUBMIT_DESTROY_ERROR:
            return initialContactState
        default:
            return state
    }
}