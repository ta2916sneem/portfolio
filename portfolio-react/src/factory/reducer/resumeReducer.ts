import {
    RESUME_DOWNLOAD_DESTROY_ERROR,
    RESUME_DOWNLOAD_FAIL,
    RESUME_DOWNLOAD_REQUEST,
    RESUME_DOWNLOAD_SUCCESS
} from "../constants/resumeConstants";
import {IAction} from "../../types/action";
import {IResumeState} from "../../types/resume";

const initialDownloadState: IResumeState = {
    downloading: false,
    downloadError: false
}

export const resumeDownloadReducer = (state:IResumeState = initialDownloadState, action: IAction):IResumeState => {
    switch (action.type) {
        case RESUME_DOWNLOAD_REQUEST:
            return {downloading: true, downloadError: false}
        case RESUME_DOWNLOAD_SUCCESS:
            return {downloading: false, downloadError: false}
        case RESUME_DOWNLOAD_FAIL:
            return {downloading: false, downloadError: action.payload}
        case RESUME_DOWNLOAD_DESTROY_ERROR:
            return initialDownloadState
        default:
            return state
    }
}