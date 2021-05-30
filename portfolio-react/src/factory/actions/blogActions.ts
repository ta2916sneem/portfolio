import {AppDispatch} from "../store";
import {
    BLOG_APPLAUD_ERROR,
    BLOG_APPLAUD_REQUEST,
    BLOG_APPLAUD_SUCCESS, BLOG_CREATE_CLEAN_STATE,
    BLOG_CREATE_DESTROY_ERROR,
    BLOG_CREATE_FAIL,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS, BLOG_DELETE_ERROR, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS,
    BLOG_PUBLISH_ERROR,
    BLOG_PUBLISH_REQUEST,
    BLOG_PUBLISH_SUCCESS,
    BLOG_READ_CLEAN_STATE,
    BLOG_READ_DESTROY_ERROR,
    BLOG_READ_ERROR,
    BLOG_READ_REQUEST,
    BLOG_READ_SUCCESS,
    BLOG_SAVE_IDLE,
    BLOG_SAVE_SUCCESS,
    BLOG_UPDATE_DESTROY_ERROR,
    BLOG_UPDATE_FAIL,
    BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS,
    BLOGS_ALL_FAIL,
    BLOGS_ALL_REQUEST,
    BLOGS_ALL_SUCCESS,
    BLOGS_HOME_FAIL,
    BLOGS_HOME_REQUEST,
    BLOGS_HOME_SUCCESS,
    BLOGS_SEARCH_EXIT,
    BLOGS_SEARCH_FAIL,
    BLOGS_SEARCH_REQUEST,
    BLOGS_SEARCH_SUCCESS
} from "../constants/blogConstants";
import axios from "axios";
import {API} from "../../config";
import {isAdmin, isAuthenticated} from "../../auth";
import {IBlog} from "../../types/blogs";
import {sleep} from "../../helpers";
import {BLOG_CONTENT_SAVED, BLOG_HEAD_SAVED} from "../../screens/CreateBlog";

export const getHomeBlogs = (limit:number=3, sortBy:string='publishedOn') => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOGS_HOME_REQUEST
        })
        let url = `${API}/blog?isPublished=true&sortBy=publishedOn&sortBy=${sortBy}&limit=${limit}`
        const {data} = await axios.get(url);
        dispatch({
            type: BLOGS_HOME_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOGS_HOME_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getAllBlogs = (limit:number=100, sortBy:string='publishedOn') => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOGS_ALL_REQUEST
        })
        let url;
        if(isAdmin()){
            url = `${API}/blog?sortBy=${sortBy}?limit=${limit}`
        }else{
            url = `${API}/blog?isPublished=true&sortBy=publishedOn&sortBy=${sortBy}&limit=${limit}`
        }
        const {data} = await axios.get(url);
        dispatch({
            type: BLOGS_ALL_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOGS_ALL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const blogsSearch = (keyword:string) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOGS_SEARCH_REQUEST
        })
        let url ;
        if(isAdmin()){
            url = `${API}/blog/search/${keyword}`
        }else{
            url = `${API}/blog/search/${keyword}?isPublished=true`
        }
        const {data} = await axios.get(url);
        dispatch({
            type: BLOGS_SEARCH_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOGS_SEARCH_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const exitSearch = () => (dispatch: AppDispatch) => {
    dispatch({
        type: BLOGS_SEARCH_EXIT
    })
}

export const readBlog = (blogId:string) => async (dispatch: AppDispatch) => {
    blogId = blogId.replace("?", "");
    try{
        dispatch({
            type: BLOG_READ_REQUEST
        })
        const {data} = await axios.get(`${API}/blog/${blogId}`);
        dispatch({
            type: BLOG_READ_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOG_READ_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const publishBlog = (blogId: string, flag:boolean) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOG_PUBLISH_REQUEST
        })
        const auth = isAuthenticated();
        if(!isAdmin()){
            dispatch({
                type: BLOG_PUBLISH_ERROR,
                payload: "Login as an admin to publish"
            });
            return;
        }
        const {data} = await axios.put(`${API}/blog/publish/${auth.userInfo._id}?_id=${blogId}&publish=${flag}`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        });
        dispatch({
            type: BLOG_PUBLISH_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOG_PUBLISH_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        await sleep(3000);
        dispatch({
            type: BLOG_READ_DESTROY_ERROR
        })
    }
}

export const deleteBlog = (blogId: string) => async (dispatch: AppDispatch) =>{
    try{
        dispatch({
            type: BLOG_DELETE_REQUEST
        });
        if(!isAdmin()){
            dispatch({
                type: BLOG_PUBLISH_ERROR,
                payload: "Login as an admin to delete"
            });
            return;
        }
        const auth = isAuthenticated();
        await axios.delete(`${API}/blog/delete/${auth.userInfo._id}?_id=${blogId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        });
        dispatch({
            type: BLOG_DELETE_SUCCESS
        })
    }catch (error){
        console.log(error.response);
        dispatch({
            type: BLOG_DELETE_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        await sleep(3000);
        dispatch({
            type: BLOG_READ_DESTROY_ERROR
        })
    }
}

export const applaudBlog = (blogId: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOG_APPLAUD_REQUEST
        });
        const {data} = await axios.put(`${API}/blog/${blogId}/applaud`);
        dispatch({
            type: BLOG_APPLAUD_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: BLOG_APPLAUD_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const cleanReadBlogState = () => (dispatch:AppDispatch) => {
    dispatch({
        type: BLOG_READ_CLEAN_STATE
    })
}

export const createBlog = (blog: IBlog) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOG_CREATE_REQUEST
        })
        const auth = isAuthenticated();
        if(!isAuthenticated()){
            dispatch({
                type: BLOG_CREATE_FAIL,
                payload: "Please login as admin to create blog"
            })
            await sleep(3000);
            dispatch({
                type: BLOG_CREATE_DESTROY_ERROR
            })
        }
        await axios.post(`${API}/blog/createblog/${auth.userInfo._id}`, blog, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        });
        dispatch({
            type: BLOG_CREATE_SUCCESS
        });
        localStorage.removeItem(BLOG_HEAD_SAVED);
        localStorage.removeItem(BLOG_CONTENT_SAVED);
    }catch (error){
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        await sleep(3000);
        dispatch({
            type: BLOG_CREATE_DESTROY_ERROR
        })
    }
}

export const createBlogCleanState = () => (dispatch: AppDispatch) => {
    dispatch({
        type: BLOG_CREATE_CLEAN_STATE
    })
}

export const createBlogError = (message: string) => async (dispatch: AppDispatch) => {
    dispatch({
        type: BLOG_CREATE_FAIL,
        payload: message
    })
    await sleep(3000);
    dispatch({
        type: BLOG_CREATE_DESTROY_ERROR
    })
}

export const createBlogSave = () => (dispatch: AppDispatch) => {
    dispatch({
        type: BLOG_SAVE_SUCCESS
    })
}

export const resetBlogAfterSave = () => (dispatch: AppDispatch) => {
    dispatch({
        type: BLOG_SAVE_IDLE
    })
}

export const updateBlog = (blog: IBlog) => async (dispatch: AppDispatch) => {
    try{
        dispatch({
            type: BLOG_UPDATE_REQUEST
        });
        if(!blog._id){
            dispatch({
                type: BLOG_UPDATE_FAIL,
                payload: "Please make sure blog have an ID"
            })
            await sleep(3000)
            dispatch({
                type: BLOG_UPDATE_DESTROY_ERROR
            })
        }else if(!isAdmin()){
            dispatch({
                type: BLOG_UPDATE_FAIL,
                payload: "Only admins can make changes to the blog"
            })
            await sleep(3000)
            dispatch({
                type: BLOG_UPDATE_DESTROY_ERROR
            })
        }else{
            await axios.put(`${API}/blog/update/${isAuthenticated().userInfo._id}`, blog,
                {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${isAuthenticated().token}`
                        }
                    }
                )
            dispatch({
                type: BLOG_UPDATE_SUCCESS
            })
        }
    }catch (error){
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        await sleep(3000);
        dispatch({
            type: BLOG_UPDATE_DESTROY_ERROR
        })
    }
}