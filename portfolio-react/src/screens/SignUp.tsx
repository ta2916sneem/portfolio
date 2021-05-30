import Layout from "../Layouts/Layout";
import React, {FC, FormEvent, useEffect, useRef} from 'react';
import {motion} from "framer-motion";
import {Redirect} from 'react-router-dom';
import paths from "../paths";
import {RouteComponentProps} from "react-router-dom";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {signup, userRegisterShowError} from "../factory/actions/userActions";

const SignUp: FC<RouteComponentProps> = ({location, history}) => {

    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let confirmPasswordRef = useRef<HTMLInputElement>(null);
    let usernameRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state:RootStateOrAny) => state.userRegister);
    const {loading, error, success, redirect} = userRegister;

    useEffect(() => {
        if(redirect){
            history.push(paths.login)
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!emailRef.current!.value || emailRef.current!.value.trim() === ""){
            dispatch(userRegisterShowError("Email is required"))
            emailRef.current!.focus();
            return;
        }
        if(!usernameRef.current!.value || usernameRef.current!.value.trim() === ""){
            dispatch(userRegisterShowError("Username is required"))
            usernameRef.current!.focus();
            return;
        }
        if(!passwordRef.current!.value || passwordRef.current!.value === ""){
            dispatch(userRegisterShowError("Password is required"))
            passwordRef.current!.focus();
            return;
        }
        if(passwordRef.current!.value.length < 6){
            dispatch(userRegisterShowError("Password must be more than 6 digits"))
            passwordRef.current!.focus();
            return;
        }
        if(!confirmPasswordRef.current!.value || confirmPasswordRef.current!.value === ""){
            dispatch(userRegisterShowError("Confirm password field is required"))
            confirmPasswordRef.current!.focus();
            return;
        }
        if(passwordRef.current!.value !== confirmPasswordRef.current!.value){
            dispatch(userRegisterShowError("Confirm password and password does not match"))
            confirmPasswordRef.current!.focus();
            return;
        }

        dispatch(signup(usernameRef.current!.value, emailRef.current!.value,
            passwordRef.current!.value, confirmPasswordRef.current!.value));
    }

    const renderError = () => {
        return error ?  (
            <motion.div
                initial={{scale: 0.5, opacity: 0.5}}
                animate={{ scale: 1, opacity: 1}}
                transition={{ type: 'spring', stiffness: 110, duration: 1}}
                className={"fixed top-16 left-0 w-screen h-16 flex justify-center items-start overflow-visible"}
            >
                <div className={"w-2/3 lg:w-1/3 h-12 bg-red-500 ring-1 ring-red-400 z-50 rounded" +
                " transition duration-1000 ease-in-out transform translate-y-4" +
                " flex items-center justify-start px-4 text-white space-x-4"}>
                    <svg className={"w-6 h-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className={"text-sm mr-8"}>
                        {error}
                    </div>
                </div>
            </motion.div>
        ) : null
    }

    const renderSuccess = () => {
        return success &&  (
            <motion.div
                initial={{scale: 0.5, opacity: 0.5}}
                animate={{ scale: 1, opacity: 1}}
                transition={{ type: 'spring', stiffness: 110, duration: 1}}
                className={"fixed top-16 left-0 w-screen h-16 flex justify-center items-start overflow-visible"}
            >
                <div className={"w-2/3 lg:w-1/3 h-12 bg-green-500 ring-1 ring-green-400 z-50 rounded" +
                " transition duration-1000 ease-in-out transform translate-y-4" +
                " flex items-center justify-start px-4 text-white space-x-4"}>
                    <svg className={"w-6 h-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className={"text-sm mr-8"}>
                        {`Signup Successful, redirecting to login page`}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <Layout className={"container flex justify-center"}>
            <div className={"mt-8 px-4 py-8 font-montserrat shadow-drop" +
            " flex flex-col items-center w-1/3 rounded-lg bg-gray-100"}>
                <img className={"w-20 h-20 ring-4 ring-gray-600 rounded-full object-cover"} src={"/images/raiyan_toon.svg"}/>
                <div className={"text-3xl mt-8 mb-4 font-bold"}>
                    SignUp
                </div>
                <form className={"w-full "} onSubmit={handleSubmit}>
                    <div className={"w-full flex flex-col items-start justify-start"}>
                        <label className={"uppercase "}>Email</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"email"} ref={emailRef}/>

                        <label className={"uppercase "}>Username</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"text"} ref={usernameRef}/>

                        <label className={"uppercase "}>Password</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"password"} ref={passwordRef}/>

                        <label className={"uppercase "}>Confirm password</label>
                        <input className={"px-4 py-2 ring-1 ring-gray-400 rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-gray-700"} type={"password"} ref={confirmPasswordRef}/>
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
            {renderError()}
            {renderSuccess()}
        </Layout>
    )
}

export default SignUp;