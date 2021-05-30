import {AppDispatch} from "../store";
import {
    CONTACT_SUBMIT_DESTROY_ERROR,
    CONTACT_SUBMIT_FAIL,
    CONTACT_SUBMIT_REQUEST,
    CONTACT_SUBMIT_SUCCESS
} from "../constants/contactConstants";
import {sleep} from "../../helpers";
import axios from 'axios';
import {API} from "../../config";
import {IContactPerson} from "../../types/contactPerson";

export const submitContact = (contactPerson: IContactPerson) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: CONTACT_SUBMIT_REQUEST
        });
        await axios.post(`${API}/contact`, contactPerson);
        dispatch({
            type: CONTACT_SUBMIT_SUCCESS
        })
    }catch (error){
        console.log(error.response);
        dispatch({
            type: CONTACT_SUBMIT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        await sleep(3000);
        dispatch({
            type: CONTACT_SUBMIT_DESTROY_ERROR
        })
    }
}