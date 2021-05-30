
import {API} from "../config";

export interface IUser {
    name?: string,
    email: string,
    password: string,
    confirmPassword? : string,
}

export const signUp = (user: IUser) => {
    return fetch(`${API}/signup`, {
        method:"POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const signIn = (user: IUser) => {
    return fetch(`${API}/signin`, {
        method:"POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const authenticate = (user: IUser, next: () => void) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(user));
        next();
    }
}

export const signOut = (next: () => void) => {
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/logout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

interface ITokeAndUserInfo{
    isAvailable: boolean,
    token: string,
    userInfo: {
        email: string,
        name: string,
        role: number,
        _id: string
    }
}

export const isAuthenticated: () => ITokeAndUserInfo = () => {
    if(typeof window === undefined){
        return {
            isAvailable: false
        }
    }
    if(localStorage.getItem("userInfo")){
        return {isAvailable: true, ...JSON.parse(localStorage.getItem('userInfo') || "false")};
    }else{
        return {
            isAvailable: false
        };
    }

}

export const isAdmin = () => {
    if(isAuthenticated().isAvailable && isAuthenticated().userInfo.role === 1){
        return true;
    }
    return false;
}