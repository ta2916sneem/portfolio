import React, {useEffect, useState} from 'react';
import Layout from "../Layouts/Layout";
import {Link, RouteComponentProps, withRouter, useHistory} from "react-router-dom";
import '../components/Editor.css'
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import {getFormattedDate} from '../helpers'
import {motion} from "framer-motion";
import {isAdmin} from "../auth";
import paths from "../paths";
import Level from "../components/Level";
import LoadingPage from "../components/LoadingPage";
import {IBlog, IBlogReadState} from "../types/blogs";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {applaudBlog, cleanReadBlogState, deleteBlog, publishBlog, readBlog} from "../factory/actions/blogActions";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);

function ReadBlog(props: RouteComponentProps<{}, any, IBlog>){

    const dispatch = useDispatch();
    const readBlogState: IBlogReadState = useSelector((state: RootStateOrAny) => state.readBlog);
    const {
        loading,
        blog,
        fetchSuccess,
        fetchError,
        applaudError,
        publishError,
        isPublishing,
        isDeleting,
        toBeDeleted,
        deleteSuccess,
        deleteError
    } = readBlogState;

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const history = useHistory();


    useEffect(() => {
        if(!fetchSuccess) {
            dispatch(readBlog(props.location.search));
            history.listen((location, action) => {
                        dispatch(cleanReadBlogState());
            })
        }else{
            const codeBlockNodes = document.querySelectorAll('pre');
            codeBlockNodes.forEach((node) => {
                hljs.highlightBlock(node);
            });
        }
    }, [dispatch, fetchSuccess]);

    const handleApplaudClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(applaudBlog(blog._id));
    }
    
    const handlePublish = async (flag: boolean) => {
        dispatch(publishBlog(blog._id, flag))
    }


    const renderPublishButtonIfAdmin = () => {
        if(!isAdmin())
            return null;
        return (
            <div className={"mt-8 hidden xl:flex flex-col justify-center items-center"}>
                {
                    !blog.isPublished ?
                        <button className={`w-2/3 py-2 px-4 rounded-full bg-gray-900 text-gray-100 transform focus:outline-none 
                             flex justify-center items-center transition duration-300 hover:-translate-y-1 shadow-drop
                              ${isPublishing && "cursor-not-allowed"}
                              `}
                                onClick={event => handlePublish(true)}
                        >
                            {
                                isPublishing ?
                                    <svg className={"w-6 h-6 mr-2 text-green-500 animate-spin"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg> :

                                    <svg className={"w-6 h-6 mr-2 text-green-500"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                            }
                            <span>Publish</span>
                        </button> :
                        <button className={`w-2/3 py-2 px-4 rounded-full bg-gray-900 text-gray-100 transform focus:outline-none 
                              flex justify-center items-center transition duration-300 hover:-translate-y-1 shadow-drop
                               ${isPublishing && "cursor-not-allowed"}
                               `}
                                onClick={event => handlePublish(false)}>
                            {
                                isPublishing ?
                                    <svg className={"w-6 h-6 mr-2 text-red-500 animate-spin "}   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg> :

                                    <svg className={"w-6 h-6 mr-2 text-red-500"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                            }
                            <span>Un Publish</span>
                        </button>
                }


            </div>
        )
    }

    const renderEditButtonIfAdmin = () => {
        if(!isAdmin()){
            return null;
        }
        return (
            <div className={"mt-8 hidden xl:flex flex-col justify-center items-center"}>
                <Link to={{pathname: paths.editBlog, state: {
                        ...blog
                    }}} className={`w-2/3 py-2 px-4 rounded-full bg-gray-900 text-gray-100 transform focus:outline-none 
                     flex justify-center items-center transition duration-300 hover:-translate-y-1 shadow-drop`}
                >
                    Edit
                </Link>
            </div>
        )
    }

    const renderDeleteButtonIfAdmin = () => {
        if(!isAdmin() || blog.isPublished){
            return null;
        }
        return (
            <div className={"mt-8 hidden xl:flex flex-col justify-center items-center"}>
                <button className={`w-2/3 py-2 px-4 rounded-full bg-gray-900 text-gray-100 transform focus:outline-none 
                     flex justify-center items-center transition duration-300 hover:-translate-y-1 shadow-drop`}
                        onClick={event => setDeleteModalOpen(true)}
                >
                    Delete
                </button>
            </div>
        )
    }
    
    const renderFullBlog = () => {
        if(!fetchSuccess || !blog)
            return null;
        return (
            <>
                <button className={"fixed bottom-4 w-20 xl:bottom-64 right-4 px-2 xl:left-32 " +
                " rounded-full shadow-mdBlue ring-1 ring-blue-200 hover:shadow-xlBlue " +
                " transition duration-400 transform bg-white" +
                " justify-center items-center flex focus:outline-none"} onClick={handleApplaudClick}>
                    <svg className={"h-8 w-8 opacity-80"} aria-label="clap"><g fillRule="evenodd"><path d="M13.74 1l.76 2.97.76-2.97zM16.82 4.78l1.84-2.56-1.43-.47zM10.38 2.22l1.84 2.56-.41-3.03zM22.38 22.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M9.1 22.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L6.1 15.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L6.4 11.26l-1.18-1.18a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L11.96 14a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L8.43 9.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L20.63 15c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM13 6.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 23 23.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z"/></g></svg>
                    <div className={"text-md text-gray-600"}>
                        {blog.applauds}
                    </div>
                </button>
                <div className={"fixed top-80 left-32 xl:flex xl:flex-col mt-8 hidden"}>
                    <div>Published On</div>
                    {!blog.publishedOn ? "Not Yet Published": getFormattedDate(blog.publishedOn)}
                </div>
                <div className={"fixed top-16 w-64 right-8 xl:flex flex-wrap mt-8 hidden text-xs"}>
                    {blog.tags && blog.tags.map((tag, index) => {
                        return <span key={index} className={"py-1 px-2 bg-blue-500 bg-opacity-10 mr-2 mb-2 rounded-full"}>{`${tag}`}</span>
                    })}
                </div>
                <div className={"fixed top-32 left-32 xl:flex xl:flex-col mt-8 hidden"}>
                    {blog.level && <Level level={blog.level}/>}
                </div>
                <div className={"fixed bottom-8 w-80 right-0 flex flex-col"}>
                    {renderPublishButtonIfAdmin()}
                    {renderEditButtonIfAdmin()}
                    {renderDeleteButtonIfAdmin()}
                </div>
                <div className={"container px-0 sm:px-8 md:px-16 lg:px-32 xl:px-64 "}>
                    <div className={"text-4xl text-gray-900 text-center " +
                    " uppercase tracking-wider font-bold my-8 "}>
                        {blog.title}
                    </div>
                    <div className={"text-xl text-gray-500 mb-8"}>
                        {blog.description}
                    </div>
                    <div className={"leading-7 ql-editor"}>
                        {fetchSuccess && blog.content &&
                        <div dangerouslySetInnerHTML={{__html: blog.content}}/>
                        }
                    </div>
                </div>
            </>
        )
    }
    
    const renderPageError = () => {
        if(fetchError){
            return (
            <div className={"container mx-auto flex justify-center pt-64"}>
                <div className={"flex flex-col  text-gray-600 justify-center items-center"}>
                    <svg className={"w-32 h-32"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className={"uppercase mt-12"}>
                        Error loading full blog. Please try again after sometime
                    </div>
                </div>
            </div>)
        }else{
            return null;
        }
    }

    const renderError = () => {

        const error = applaudError || publishError || deleteError;

        return error ?  (
            <motion.div
                initial={{scale: 0.5, opacity: 0.5}}
                animate={{ scale: 1, opacity: 1}}
                transition={{ type: 'spring', stiffness: 110, duration: 1}}
                className={"fixed top-16 left-0 w-screen h-16 flex z-50 justify-center items-start overflow-visible"}
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

    const renderPageLoader = () => {
        if(loading && !fetchSuccess){
            return (
                <LoadingPage/>
            )
        }else{
            return null;
        }
    }

    const renderDeleteModal = () => {

        const handleCLickAway = (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            // @ts-ignore
            if(event.target.getAttribute("id") === "modalOut"){
                setDeleteModalOpen(false);
            }
        }

        const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if(!isAdmin()){
                return;
            }
            history.push(paths.allBlogs);
            dispatch(deleteBlog(blog._id));
        }


        return deleteModalOpen ? (
            <div
                className={"w-screen bottom-0 left-0 absolute bg-black" +
                " absolute inset-0 z-30" +
                " bg-opacity-40"} onClick={handleCLickAway}>
                <div className={"h-screen w-screen fixed flex flex-col xl:flex-row justify-center items-center"} id={"modalOut"}
                >
                    <motion.div
                        initial={{scale: 0.5, opacity: 0.5}}
                        animate={{ scale: 1, opacity: 1}}
                        transition={{ type: 'spring', stiffness: 110, duration: 0.75}}
                        className={"w-3/4 sm:w-1/2 bg-white opacity-100 rounded-lg" +
                        " flex flex-col justify-center items-center z-40 font-montserrat p-12"}>
                        <div className={"text-xl mb-8"}>Are you sure, you want to delete this blog?</div>
                        {
                            isDeleting ?
                                <svg className={"w-12 h-12 mr-2 text-red-500 animate-spin"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                :
                                <div className={"flex space-x-8 justify-center"}>
                                    <button onClick={handleDelete} className={"uppercase px-4 py-2 border-2 rounded focus:outline-none border-red-500 transition duration-400 transform hover:bg-red-500 text-red-500 hover:text-white"}>Yes</button>
                                    <button onClick={event => setDeleteModalOpen(false)} className={"uppercase px-4 py-2 border-2 rounded focus:outline-none border-green-500 transition duration-400 transform hover:bg-green-500 text-green-500 hover:text-white"}>No</button>
                                </div>
                        }
                    </motion.div>
                </div>
            </div>
        ): null;
    }


    return (
        <Layout className={"font-montserrat px-2 sm:px-8"}>
            {renderDeleteModal()}
            {renderPageLoader()}
            {renderFullBlog()}
            {renderPageError()}
            {renderError()}
        </Layout>
    )
}

export default withRouter(ReadBlog);