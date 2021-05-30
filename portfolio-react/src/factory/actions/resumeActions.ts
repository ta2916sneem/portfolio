import {AppDispatch} from "../store";
import {
    RESUME_DOWNLOAD_REQUEST,
    RESUME_DOWNLOAD_FAIL,
    RESUME_DOWNLOAD_SUCCESS, RESUME_DOWNLOAD_DESTROY_ERROR
} from '../constants/resumeConstants';
import Axios from "axios";
import {API} from "../../config";
import FileDownload from "js-file-download";
import {sleep} from "../../helpers";


export const downloadResume = () => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: RESUME_DOWNLOAD_REQUEST
        })
        const {data} = await Axios({
            url: `${API}/profile/resume`,
            method: 'GET',
            responseType: 'blob', // Important
        })
        // @ts-ignore
        FileDownload(data, 'resume_raiyan.pdf');
        dispatch({
            type: RESUME_DOWNLOAD_SUCCESS
        })
    }catch (error){
        console.log(error);
        dispatch({
            type: RESUME_DOWNLOAD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        await sleep(3000);
        dispatch({
            type: RESUME_DOWNLOAD_DESTROY_ERROR
        })
    }
}