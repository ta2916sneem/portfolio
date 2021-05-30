import axios from 'axios';

import {
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_REGISTER_FAIL, USER_REGISTER_DESTROY_ERROR, USER_REGISTER_SHOW_ERROR, USER_REGISTER_REDIRECT
} from "../constants/userConstants";

import {AppDispatch} from "../store";
import {API} from "../../config";
import {sleep} from "../../helpers";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
            payload: null
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            `${API}/auth/login`,
            {email, password},
                config
            );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const signup = (name: string, email: string, password: string, confirmPassword: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        await axios.post(`${API}/auth/signup`,
            {name, email, password, confirmPassword});
        dispatch({
            type: USER_REGISTER_SUCCESS,
        })
        await sleep(3000)
        dispatch({
            type: USER_REGISTER_REDIRECT,
        })
    }catch (error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
        await sleep(3000);
        dispatch({
            type: USER_REGISTER_DESTROY_ERROR
        })
    }
}

export const logout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT, payload: null })
}

export const userRegisterShowError = (message: string) =>  async (dispatch: AppDispatch) =>{
    dispatch({
        type: USER_REGISTER_SHOW_ERROR,
        payload: message
    })
    await sleep(3000);
    dispatch({
        type: USER_REGISTER_DESTROY_ERROR,
    })
}

