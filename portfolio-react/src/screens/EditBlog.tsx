import Layout from "../Layouts/Layout";
import React, {FC, useRef, useState} from "react";
import ReactQuill from "react-quill";
import {motion} from "framer-motion";
import {RouteComponentProps, useHistory} from "react-router-dom";
import TagsAndLevels from "../components/TagsAndLevels";
import Editor from "../components/Editor";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {IBlogEditState} from "../types/blogs";
import {updateBlog} from "../factory/actions/blogActions";

interface IBlogEditProps{
    _id: string
    title: string,
    description: string,
    content: string,
}

interface ILevelAndTag{
    tags: Set<string>,
    level: string | null,
}

const EditBlog:FC<RouteComponentProps<{}, any, IBlogEditProps & ILevelAndTag>> = (props) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<ReactQuill>(null);

    const history = useHistory();

    const {_id, level, tags, title, description, content} = props.location?.state;

    const [levelAndTag,setLevelAndTag] = useState<ILevelAndTag>({
        tags: tags ? new Set<string>(tags) : new Set<string>(),
        level: level ? level : null
    });

    const dispatch = useDispatch();
    const editBlogState: IBlogEditState = useSelector((state: RootStateOrAny) => state.updateBlog)
    const {isUpdating, updateSuccess, updateError} = editBlogState

    const updateHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(updateBlog({
                    _id: _id,
                    title: titleRef.current!.value,
                    description: descriptionRef.current!.value,
                    level: levelAndTag.level,
                    tags: Array.from(levelAndTag.tags),
                    content: ""+editorRef.current!.props.value
                }))
    }

    const tagsAndLevelsChangeHandler = (currentLevel: string|null , selectedTags: Set<string>) => {
        setLevelAndTag({
            tags: selectedTags,
            level: currentLevel
        })
    }

    const renderError = () => {
        return updateError ?  (
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
                        {updateError}
                    </div>
                </div>
            </motion.div>
        ) : null
    }

    return (
        <Layout className={""}>

            <TagsAndLevels handleChange={tagsAndLevelsChangeHandler} currentTags={tags} currentLevel={level}/>

            <div className={`xl:pl-80 pl-8 pr-8 py-4 flex flex-col items-center }`}>
                <div className={"flex flex-col justify-start w-full pb-8"}>
                    <label className={"text-gray-500 text-bold px-2 py-2"}>Title</label>
                    <input placeholder={"Your blog title here..."}
                           defaultValue={title}
                           ref={titleRef}
                           className={"w-full px-4 py-2 focus:outline-none " +
                           " rounded text-3xl border-2 border-gray-900"}/>
                </div>
                <div className={"flex flex-col justify-start w-full pb-8"}>
                    <label className={"text-gray-500 text-bold px-2 py-2"}>Description</label>
                    <textarea rows={3} cols={50}
                              defaultValue={description}
                              ref={descriptionRef}
                              className={"focus:outline-none border-2" +
                              " border-gray-900 rounded px-4 py-2"} placeholder={"Give a short description here..."}>

                   </textarea>
                </div>
                <Editor ref={editorRef} content={content}/>
                <div className={"space-x-4 flex justify-end w-full"}>
                    <button className={"bg-gray-900 px-4 py-2 rounded-lg w-32 " +
                    "transition duration-200 ease-in-out transform hover:-translate-y-1 " +
                    " focus:outline-none " +
                    "text-white shadow-drop font-montserrat uppercase tracking-wider"}
                            onClick={history.goBack}
                    >
                        Cancel
                    </button>
                    <button className={"bg-gray-900 px-4 py-2 rounded-lg w-32 " +
                    "transition duration-200 ease-in-out transform hover:-translate-y-1 " +
                    " focus:outline-none " +
                    "text-white shadow-drop font-montserrat uppercase tracking-wider"}
                    onClick={updateHandler}
                    >
                        {
                            isUpdating ?
                                <svg className={"w-6 h-6 mr-2 text-green-500 animate-spin"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg> :
                                "Update"
                        }
                    </button>
                </div>
            </div>
            {renderError()}

        </Layout>
    )
}

export default EditBlog;