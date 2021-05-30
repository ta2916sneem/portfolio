import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {initialUserState, userLoginReducer, userRegisterReducer} from "./reducer/userReducer";
import {resumeDownloadReducer} from "./reducer/resumeReducer";
import {
    blogsHomeReducer,
    blogsReducer,
    blogsSearchReducer,
    createBlogReducer,
    readBlogReducer, updateBlogReducer
} from "./reducer/blogReducer";
import {contactSubmitReducer} from "./reducer/contactReducer";


const reducer = combineReducers({
        userLoginState: userLoginReducer,
        userRegister: userRegisterReducer,
        resumeDownload: resumeDownloadReducer,
        blogs: blogsReducer,
        blogsHome: blogsHomeReducer,
        blogsSearch: blogsSearchReducer,
        readBlog: readBlogReducer,
        createBlog: createBlogReducer,
        contactSubmit: contactSubmitReducer,
        updateBlog: updateBlogReducer
    })

const userLoginFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || 'false')
    : null

const initialState = {
    userLoginState: {
        ...initialUserState,
        userLogin: userLoginFromStorage ? userLoginFromStorage : initialUserState.userLogin
    }
}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    process.env.NODE_ENV === "production"
        ? applyMiddleware(...middlewares)
        : composeWithDevTools(applyMiddleware(...middlewares))
);

export type AppDispatch = typeof store.dispatch

export default store;