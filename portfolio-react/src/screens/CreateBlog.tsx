import React, {FC, useEffect, useRef, useState} from 'react';
import Layout from "../Layouts/Layout";
import ReactQuill from "react-quill";
import {motion} from 'framer-motion';
import TagsAndLevels from "../components/TagsAndLevels"
import Editor from "../components/Editor";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {Success} from "../types/blogs";
import {useHistory, Redirect} from 'react-router-dom'
import {
    createBlog,
    createBlogCleanState,
    createBlogError,
    createBlogSave,
    resetBlogAfterSave
} from "../factory/actions/blogActions";
import paths from "../paths";

export const BLOG_HEAD_SAVED = "BLOG_SAVED";
export const BLOG_CONTENT_SAVED = "BLOG_CONTENT_SAVED";

interface IBlogHead{
    tags: Set<string>,
    level: string | null
}


const CreateBlog: FC = () => {

    const [blogHead, setBlogHead] = useState<IBlogHead>({
        tags: new Set(),
        level: null
    });

    const editorRef = useRef<ReactQuill>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const history = useHistory();

    const dispatch = useDispatch();
    const createBlogState = useSelector((state: RootStateOrAny) => state.createBlog);
    const {
        isSubmitting,
        createSuccess,
        createError,
    } = createBlogState;

    const userLoginState = useSelector((state: RootStateOrAny) => state.userLoginState);

    useEffect(() => {

        const {tags, level, title, description}: IBlogHead & {title: string, description: any} = JSON.parse(localStorage.getItem(BLOG_HEAD_SAVED) || 'false');
        if({tags, level}){
            setBlogHead({tags, level});
        }
        if(title && title.trim() !== ""){
            titleRef.current!.value = title
        }
        if(description && description.trim() !== ""){
            descriptionRef.current!.value = description
        }
    }, []);

    const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        localStorage.setItem(BLOG_HEAD_SAVED, JSON.stringify({...blogHead, title: titleRef.current!.value, description: descriptionRef.current!.value}));
        localStorage.setItem(BLOG_CONTENT_SAVED, JSON.stringify(""+editorRef.current!.props.value.toString().trim()));
        dispatch(createBlogSave())
    }

    const handleSubmission = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(createBlog({
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            level: blogHead.level,
            tags: blogHead.tags && Array.from(blogHead.tags),
            content: ""+editorRef.current!.props.value
        }))
    }

    const handleCLickAway = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if(createSuccess === Success.SAVED){
            dispatch(resetBlogAfterSave())
        }
    }

    const handleReviewAfterSubmission = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        history.push(paths.allBlogs);
        dispatch(createBlogCleanState())
        // todo: Open the blog after submission.
    }

    const handleHomeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        history.push(paths.home);
        dispatch(createBlogCleanState());
    }


    const renderSuccess = () => {

        return createSuccess !== Success.IDLE ? (<div
            className={"w-screen bottom-0 left-0 absolute bg-black z-50 " +
            " absolute inset-0" +
            " bg-opacity-40"}>
            <div className={"h-screen w-screen fixed flex justify-center items-center"}
                onClick={e => handleCLickAway(e)}
            >
                <motion.div
                    initial={{scale: 0.5, opacity: 0.5}}
                    animate={{ scale: 1, opacity: 1}}
                    transition={{ type: 'spring', stiffness: 110, duration: 0.75}}
                    className={"w-2/3 sm:w-1/2 h-72 sm:h-64 bg-white opacity-100 rounded-lg" +
                    " flex flex-col justify-center items-center"}>
                    <svg className={"h-20 w-20 text-green-400"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"/>
                    </svg>
                    <div className={"p-4 text-center"}>
                        {createSuccess === Success.SAVED ? "Your Blog Have Been Successfully Saved Locally":
                            <div>
                                <div>You Blog Have Been Successfully Submitted. It will be published once moderated.</div>
                                <div className={"flex justify-center items-center p-4 space-x-2"}>
                                    <button className={"border-2 border-green-400 px-4 py-2 rounded-lg w-32 " +
                                    "transition duration-200 ease-in-out transform hover:-translate-y-1 " +
                                    " focus:outline-none " +
                                    "text-green-400 shadow-drop font-montserrat uppercase tracking-wider"}
                                            onClick={handleHomeClick}
                                    >
                                        Home
                                    </button>
                                    <button className={"border-2 border-green-400 bg-green-400 px-4 py-2 rounded-lg w-32 " +
                                    "transition duration-200 ease-in-out transform hover:-translate-y-1 " +
                                    " focus:outline-none " +
                                    "text-white shadow-drop font-montserrat uppercase tracking-wider"} onClick={handleReviewAfterSubmission}>
                                        Edit
                                    </button>
                                </div>
                            </div>}
                    </div>
                </motion.div>
            </div>
        </div>) :
            null
    }

    const renderError = () => {
        return createError ?  (
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
                        {createError}
                    </div>
                </div>
            </motion.div>
        ) : null
    }

    const tagsAndLevelsChangeHandler = (level: string| null , selectedTags: Set<string>) => {
        setBlogHead({
            ...blogHead,
            tags: selectedTags,
            level: level
        })
    }

    return (
        <>
            {(!userLoginState.userLogin || !userLoginState.userLogin.userInfo ) &&
                <Redirect to={paths.home}/>
            }
            <Layout className={""}>

                <TagsAndLevels handleChange={tagsAndLevelsChangeHandler} currentLevel={null} currentTags={new Set<string>()}/>

                <div className={`xl:pl-80 pl-8 pr-8 py-4 flex flex-col items-center }`}>
                    <div className={"flex flex-col justify-start w-full pb-8"}>
                        <label className={"text-gray-500 text-bold px-2 py-2"}>Title</label>
                        <input placeholder={"Your blog title here..."}
                               className={"w-full px-4 py-2 focus:outline-none " +
                               " rounded text-3xl border-2 border-gray-900"} ref={titleRef}/>
                    </div>
                    <div className={"flex flex-col justify-start w-full pb-8"}>
                        <label className={"text-gray-500 text-bold px-2 py-2"}>Description</label>
                       <textarea rows={3} cols={50}
                                 className={"focus:outline-none border-2" +
                       " border-gray-900 rounded px-4 py-2"} placeholder={"Give a short description here..."} ref={descriptionRef}>

                       </textarea>
                    </div>
                    <Editor ref={editorRef} content={JSON.parse(localStorage.getItem(BLOG_CONTENT_SAVED))}/>
                    <div className={"space-x-4 flex justify-end w-full"}>
                        <button className={"border-2 border-gray-900 px-4 py-2 rounded-lg w-32 " +
                        "transition duration-200 ease-in-out transform hover:-translate-y-1 " +
                        " focus:outline-none " +
                        "text-gray-900 shadow-drop font-montserrat uppercase tracking-wider"}
                        onClick={e => handleSave(e)}
                        >
                            Save
                        </button>
                        <button className={`bg-gray-900 px-4 py-2 rounded-lg w-32 transition duration-200 
                         ease-in-out transform hover:-translate-y-1 focus:outline-none text-white shadow-drop text-center 
                          font-montserrat uppercase tracking-wider ${isSubmitting && "cursor-not-allowed"}` } onClick={handleSubmission}>
                            { isSubmitting ?
                                <svg className={"w-6 h-6 mx-auto text-green-500 animate-spin"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>:
                                "Submit"}
                        </button>
                    </div>
                </div>
                {renderError()}
                {renderSuccess()}

            </Layout>
        </>
    )
}

export default CreateBlog;