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
    BLOG_READ_CLEAN_STATE, BLOG_READ_DESTROY_ERROR,
    BLOG_READ_ERROR,
    BLOG_READ_REQUEST,
    BLOG_READ_SUCCESS,
    BLOG_SAVE_IDLE,
    BLOG_SAVE_SUCCESS, BLOG_UPDATE_DESTROY_ERROR, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS,
    BLOGS_ALL_FAIL,
    BLOGS_ALL_REQUEST,
    BLOGS_ALL_SUCCESS, BLOGS_HOME_FAIL, BLOGS_HOME_REQUEST, BLOGS_HOME_SUCCESS,
    BLOGS_SEARCH_EXIT,
    BLOGS_SEARCH_FAIL,
    BLOGS_SEARCH_REQUEST,
    BLOGS_SEARCH_SUCCESS
} from "../constants/blogConstants";
import {
    IBlogCreateState,
    IBlogEditState,
    IBlogReadState,
    IBlogState,
    IHomeBlogState,
    ISearchState,
    Success
} from "../../types/blogs";
import {IAction} from "../../types/action";

const initialBlogState: IBlogState = {
    allBlogs: [],
    readBlog: null,
    loading: false,
    error: false,
    success: false,
}

const initialSearchState: ISearchState = {
    searchedBlogs: [],
    searching: false,
    searchSuccess: false,
    searchError: false,
    isInSearchMode: false
}

const initialReadBlogState: IBlogReadState = {
    loading: false,
    blog: undefined,
    fetchSuccess: false,
    fetchError: false,
    isApplauding: false,
    applaudError: false,
    publishError: false,
    isPublishing: false,
    isDeleting: false,
    toBeDeleted: false,
    deleteSuccess: false,
    deleteError: false
}

const initialHomeBlogState: IHomeBlogState = {
    homeBlogLoading: false,
    homeBlogError: false,
    homeBlogSuccess: false,
    homeBlogs: []
}

export const blogsReducer = (state:IBlogState = initialBlogState, action: IAction):IBlogState => {
    switch (action.type) {
        case BLOGS_ALL_REQUEST:
            return {...state, loading: true, error: false}
        case BLOGS_ALL_SUCCESS:
            return {...state, loading: false, allBlogs: action.payload, success:true}
        case BLOGS_ALL_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export const blogsHomeReducer = (state:IHomeBlogState = initialHomeBlogState, action: IAction):IHomeBlogState => {
    switch (action.type) {
        case BLOGS_HOME_REQUEST:
            return {...state, homeBlogLoading: true, homeBlogError: false}
        case BLOGS_HOME_SUCCESS:
            return {...state, homeBlogLoading: false, homeBlogs: action.payload, homeBlogSuccess:true}
        case BLOGS_HOME_FAIL:
            return {...state, homeBlogLoading: false, homeBlogError: action.payload}
        default:
            return state
    }
}

export const blogsSearchReducer = (state:ISearchState = initialSearchState, action: IAction):ISearchState => {
    switch (action.type){
        case BLOGS_SEARCH_REQUEST:
            return {...state, searching: true, searchError: false, isInSearchMode: true}
        case BLOGS_SEARCH_SUCCESS:
            return {...state, searching: false, searchSuccess: true, searchedBlogs: action.payload, isInSearchMode: true}
        case BLOGS_SEARCH_FAIL:
            return {...state, searching: false, searchError: action.payload, isInSearchMode: true}
        case BLOGS_SEARCH_EXIT:
            return {...state, searching: false, searchSuccess: false, searchError: false, isInSearchMode: false}
        default:
            return state
    }
}

export const readBlogReducer = (state:IBlogReadState=initialReadBlogState, action: IAction): IBlogReadState => {
    switch (action.type){
        case BLOG_READ_REQUEST:
            return {...state, loading: true}
        case BLOG_READ_SUCCESS:
            return {...state, loading: false, fetchSuccess: true, blog: action.payload}
        case BLOG_READ_ERROR:
            return {...state, loading: false, fetchError: action.payload}
        case BLOG_PUBLISH_REQUEST:
            return {...state, isPublishing: true, publishError: false}
        case BLOG_PUBLISH_SUCCESS:
            return {...state, isPublishing: false, blog: action.payload}
        case BLOG_PUBLISH_ERROR:
            return {...state, isPublishing: false, publishError: action.payload}
        case BLOG_APPLAUD_REQUEST:
            return {...state, isApplauding: true}
        case BLOG_APPLAUD_SUCCESS:
            return {...state, isApplauding: false, blog: action.payload}
        case BLOG_APPLAUD_ERROR:
            return {...state, isApplauding: false, applaudError: action.payload}
        case BLOG_READ_CLEAN_STATE:
            return initialReadBlogState
        case BLOG_DELETE_REQUEST:
            return {...state, isDeleting: true}
        case BLOG_DELETE_SUCCESS:
            return {...initialReadBlogState, deleteSuccess: true}
        case BLOG_DELETE_ERROR:
            return {...state, isDeleting: false, deleteError: action.payload}
        case BLOG_READ_DESTROY_ERROR:
            return {...state, applaudError: false, fetchError: false, publishError: false, deleteError: false}
        default:
            return state
    }
}

const initialBlogCreateState: IBlogCreateState = {
    isSubmitting: false,
    createSuccess: Success.IDLE,
    createError: false
}

export const createBlogReducer = (state:IBlogCreateState=initialBlogCreateState, action: IAction):IBlogCreateState => {
    switch (action.type){
        case BLOG_CREATE_REQUEST:
            return {...state, isSubmitting: true}
        case BLOG_CREATE_SUCCESS:
            return {isSubmitting: false, createError: false, createSuccess: Success.Submitted}
        case BLOG_SAVE_SUCCESS:
            return {...state, createSuccess: Success.SAVED}
        case BLOG_SAVE_IDLE:
            return {...state, createSuccess: Success.IDLE}
        case BLOG_CREATE_FAIL:
            return {...state, isSubmitting: false, createError: action.payload}
        case BLOG_CREATE_DESTROY_ERROR:
            return {...state, createError: false}
        case BLOG_CREATE_CLEAN_STATE:
            return initialBlogCreateState
        default:
            return state
    }
}

const initialBlogEditState: IBlogEditState = {
    isUpdating: false,
    updateError: false,
    updateSuccess: false
}

export const updateBlogReducer = (state:IBlogEditState=initialBlogEditState, action: IAction): IBlogEditState => {
    switch (action.type){
        case BLOG_UPDATE_REQUEST:
            return {...state, isUpdating: true}
        case BLOG_UPDATE_SUCCESS:
            return {...state, isUpdating: false, updateSuccess: true}
        case BLOG_UPDATE_FAIL:
            return {...state, isUpdating: false, updateError: action.payload}
        case BLOG_UPDATE_DESTROY_ERROR:
            return initialBlogEditState
        default:
            return state
    }
}