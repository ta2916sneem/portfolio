
export interface ITokeAndUserInfo{
    isAvailable?: boolean,
    token?: string,
    userInfo?: {
        email: string,
        name: string,
        role: number,
        _id: string
    }
}

export interface IUserState {
    loading?: boolean,
    error?: boolean | string,
    userLogin: ITokeAndUserInfo,
    success?: boolean,
    redirect?: boolean
}

export interface IRegisterUserState{
    loading?: boolean,
    error?: boolean | string,
    success?: boolean,
    redirect?: boolean
}