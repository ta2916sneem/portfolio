import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import paths from "../paths";
import BlogCard from "../components/BlogCard";
import {IHomeBlogState} from "../types/blogs";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getHomeBlogs} from "../factory/actions/blogActions";
import LoadingCard from "../components/LoadingCard";

const HomeBlogs = () => {

    const dispatch = useDispatch();
    const homeBlogsState:IHomeBlogState = useSelector((state: RootStateOrAny) => state.blogsHome);
    const {homeBlogLoading, homeBlogSuccess, homeBlogs} = homeBlogsState;

    useEffect(() => {
        dispatch(getHomeBlogs())
    }, [dispatch]);

    const renderFewBlogs = () => {
        if(homeBlogLoading){
            return [1, 2, 3].map((_, index) => {
                return <LoadingCard animate={`animate-pulse`} key={index}/>
            })
        }

        if(!homeBlogSuccess){
            return null;
        }

        return homeBlogs.map((blog, index) => {
            return <BlogCard _id={blog._id} key={index} tags={blog.tags} isPublished={blog.isPublished}
                             applauds={blog.applauds} publishedOn={blog.publishedOn} level={blog.level}
                             title={blog.title} description={blog.description}/>
        })
    }

    return (
        <div className={"lg:px-16 pt-8 pb-16"}>
            <div className="mb-4 text-2xl font-montserrat border-b-2 text-gray-600 border-gray-600 inline-block">
                Blogs
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {
                    renderFewBlogs()
                }
            </div>
            <Link to={paths.allBlogs} className={"float-right mt-2 underline font-montserrat" +
            " transition duration-500 " +
            " hover:text-blue-500"}>Read more...</Link>
        </div>
    )
}

export default React.memo(HomeBlogs);