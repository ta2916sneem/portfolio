import React, {FC, useEffect, useRef} from 'react';
import Layout from "../Layouts/Layout";
import BlogCard from "../components/BlogCard";
import {isAdmin} from '../auth';
import LoadingCard from "../components/LoadingCard";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {blogsSearch, getAllBlogs, exitSearch} from '../factory/actions/blogActions';
import {IBlog} from "../types/blogs";

const AllBlogs: FC = () => {
    const searchRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const blogs = useSelector((state:RootStateOrAny) => state.blogs);
    const {allBlogs, loading, success, error} = blogs;
    const blogsSearchData = useSelector((state:RootStateOrAny) => state.blogsSearch);
    const {searchedBlogs, searching, searchSuccess, searchError, isInSearchMode} = blogsSearchData;

    useEffect(  () => {
        dispatch(getAllBlogs())
    }, [dispatch]);

    const handleBlogSearch = () => {
        if(searchRef.current && searchRef.current!.value.trim() === "")
            return;
        dispatch(blogsSearch(searchRef.current!.value))
    }

    const renderLoader = () => {
        return <div className={"mt-20"}>
            <div className={"w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {
                    [1, 2, 3, 4, 5, 6].map((_, index) => {
                        return <LoadingCard animate={`animate-pulse`} key={index}/>
                    })
                }
            </div>
        </div>
    }

    const renderBlogCards = () => {

        if(searching){
            return <div className={"font-montserrat text-3xl"}>Searching...</div>
        }

        if(searchSuccess && searchRef.current && searchRef.current!.value.trim() !== ""){

            return <div className={"mt-20 font-montserrat"}>
                <div className={"text-3xl flex justify-between"}>
                    <span>Search Results</span>
                    <button className={"flex justify-center items-center text-lg" +
                    " transition duration-300 transform hover:text-blue-500 focus:outline-none"}
                        onClick={event => dispatch(exitSearch())}
                    >
                        <svg className={"h-4 w-4"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Go Back</span>
                    </button>
                </div>
                {
                    searchedBlogs.length === 0 ? <div>No data found related to {searchRef.current!.value}. Please search for different keyword</div> :
                        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                            {searchedBlogs.map((blog, index: number) => {
                                return <BlogCard _id={blog._id} key={index} tags={blog.tags}
                                                 applauds={blog.applauds} publishedOn={blog.publishedOn}
                                                    isPublished={blog.isPublished} level={blog.level}
                                                 title={blog.title} description={blog.description}/>
                            })}
                        </div>
                }
            </div>
        }

        if(isAdmin()){
            return <div className={"mt-20 font-montserrat"}>
                <div className={"text-3xl"}>
                    Published Blogs
                </div>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 "}>
                    {allBlogs.filter(blog => blog.isPublished ).map((blog: IBlog, index: number) => {
                        return <BlogCard _id={blog._id} key={index} tags={blog.tags} isPublished={blog.isPublished}
                                         applauds={blog.applauds} publishedOn={blog.publishedOn} level={blog.level}
                                         title={blog.title} description={blog.description}/>
                    })}
                </div>

                <br/>

                <div className={"text-3xl mt-8"}>
                    Unpublished Blogs
                </div>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 "}>
                    {allBlogs.filter(blog => !blog.isPublished ).map((blog: IBlog, index: number) => {
                        return <BlogCard _id={blog._id} key={index} tags={blog.tags} isPublished={blog.isPublished}
                                         applauds={blog.applauds} publishedOn={blog.publishedOn} level={blog.level}
                                         title={blog.title} description={blog.description}/>
                    })}
                </div>
            </div>
        }

        return <div className={"mt-20 font-montserrat"}>
                <div className={"text-3xl"}>
                    All Blogs
                </div>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 "}>
                    {allBlogs.map((blog: IBlog, index: number) => {
                        return <BlogCard _id={blog._id} key={index} tags={blog.tags} isPublished={blog.isPublished}
                                  applauds={blog.applauds} publishedOn={blog.publishedOn} level={blog.level}
                                  title={blog.title} description={blog.description}/>
                    })}
                </div>
            </div>
    }


    return (
        <Layout>
            <div className={"container mx-auto md:px-20 pb-8"}>
                <div className={"bg-white py-2 fixed top-10 left-0 w-screen z-20 flex justify-center items-center"}>
                    <div className={"w-full sm:w-2/3 lg:w-1/2 relative flex items-center mx-8 sm:mx-0"}>
                        <input className={"w-full py-2 pl-4 pr-12 ring-1 ring-gray-200" +
                        " focus:outline-none rounded-lg text-gray-800 text-lg" +
                        " focus:ring-1 focus:ring-gray-400"} placeholder={"Search for a blog..."}
                               ref={searchRef}
                               onKeyDown={event => {if(event.key === 'Enter'){handleBlogSearch()}}}
                        />
                        <button className={"absolute right-0 focus:outline-none"} onClick={handleBlogSearch}>
                            <svg className={"h-8 w-8 mx-4 text-gray-500"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {loading && renderLoader()}
                {success && renderBlogCards()}
            </div>
        </Layout>
    )
}

export default AllBlogs;