import Layout from "../Layouts/Layout";
import React, {FC, FormEvent, useEffect, useRef} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {login} from "../factory/actions/userActions";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import paths from "../paths";

const Login: FC<RouteComponentProps> = ({location, history}) => {

    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const userLoginState = useSelector((state:RootStateOrAny) => state.userLoginState);
    const {loading, error, userLogin, success} = userLoginState;
    const {userInfo} = userLogin;

    useEffect(() => {
        if(userInfo != null){
            history.push(paths.home);
        }
    }, [dispatch, userLogin])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!emailRef.current!.value || emailRef.current!.value.trim() === ""){
            emailRef.current!.focus();
            return;
        }
        if(!passwordRef.current!.value || passwordRef.current!.value.trim() === ""){
            passwordRef.current!.focus();
            return;
        }
        dispatch(login(emailRef.current!.value, passwordRef.current!.value))
    }

    return (
        <Layout className={"container flex justify-center"}>
            <div className={"mt-16 px-4 py-8 font-montserrat shadow-drop" +
            " flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 rounded-lg bg-gray-100"}>
                <img className={"w-20 h-20 ring-4 ring-gray-600 rounded-full object-cover"} src={"/images/raiyan_toon.svg"}/>
                <div className={"text-3xl mt-16 mb-8 font-bold"}>
                    Login
                </div>
                <form className={"w-full "} onSubmit={handleSubmit}>
                    <div className={"w-full flex flex-col items-start justify-start"}>
                        <label className={"uppercase "}>Email</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"email"} ref={emailRef}/>

                        <label className={"uppercase "}>password</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"password"} ref={passwordRef}/>
                    </div>
                    <div className={"w-full flex justify-center"}>
                        <button className={`${loading && "cursor-not-allowed opacity-80"} w-2/3 px-4 py-2 font-bold bg-gray-900 text-white rounded-lg shadow-drop
                         transition duration-500 transform ${!loading && "hover:-translate-y-1"} focus:outline-none uppercase
                          flex justify-center`}
                        type={"submit"}
                        >
                            {
                                loading ?
                                        <svg className={"w-6 h-6 mr-2 text-gray-100 animate-spin"}   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                    :
                                    "Login"
                            }

                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login;