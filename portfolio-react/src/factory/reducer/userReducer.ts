import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,USER_REGISTER_REDIRECT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_DESTROY_ERROR, USER_REGISTER_SHOW_ERROR
} from "../constants/userConstants";
import {IRegisterUserState, IUserState} from "../../types/user";
import {IAction} from "../../types/action";


export const initialUserState: IUserState = {
    loading: false,
    error: false,
    userLogin: {
        token: null,
        userInfo: null
    },
    success: false,
}

const initialRegisterUser: IRegisterUserState = {
    loading: false,
    error: false,
    redirect: false,
    success: false,
}

export function userLoginReducer(state = initialUserState, action: IAction): IUserState {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, loading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, loading: false, userLogin: action.payload}
        case USER_LOGIN_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_LOGOUT:
            return initialUserState
        default:
            return state
    }
}

export function userRegisterReducer(state = initialRegisterUser, action: IAction): IRegisterUserState {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {...state, loading: true}
        case USER_REGISTER_SUCCESS:
            return {...state, loading: false, success: true}
        case USER_REGISTER_REDIRECT:
            return {...state, redirect: true}
        case USER_REGISTER_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_REGISTER_SHOW_ERROR:
            return {...state, error: action.payload}
        case USER_REGISTER_DESTROY_ERROR:
            return {...state, error: false}
        default:
            return state
    }
}