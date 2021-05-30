import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';
import {API} from "../config";

interface IPropTypes{
    handleChange: (level: string|null , selectedTags: Set<string>) => void,
    currentTags?: Set<string>,
    currentLevel: string|null
}

const levels = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced"
}

const TagsAndLevels: FC<IPropTypes> = ({handleChange, currentTags, currentLevel}) => {

    const [searchString, setSearchString] = useState<string>("");
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(currentTags));
    const [level, setLevel] = useState<string | null >(currentLevel);

    const handleTagSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let search = event.target.value;
        setSearchString(search);
        if(search.length >= 3){
            try{
                const searchResultFromAPI = await axios(`${API}/blog/tags/${search}`);
                const searchResult = searchResultFromAPI.data ?  searchResultFromAPI.data.map((result: {name: string}) => result.name) : [];
                setSearchTags(searchResult);
            }catch (error){
                console.log(error);
                setSearchTags([]);
            }
        }else{
            setSearchTags([]);
        }
    }

    const handleTagSelection = (event: React.MouseEvent, tagName: string) => {
        const allSelectedTags = new Set(selectedTags);
        allSelectedTags.add(tagName);
        setSelectedTags(allSelectedTags);
        setSearchTags([]);
        setSearchString("");
        handleChange(level, allSelectedTags);
    }

    const handleLevelSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedLevel = event.target.value;
        if(selectedLevel !== levels.BEGINNER && selectedLevel !== levels.INTERMEDIATE && selectedLevel !==  levels.ADVANCED ){
            return;
        }
        setLevel(event.target.value);
        handleChange(selectedLevel, selectedTags);
    }


    const renderSearchTags = () => {
        if(searchTags.length === 0 && searchString === ""){
            return null;
        }
        return (
            <div className={"w-full max-h-40 absolute bg-gray-100 mt-1 text-gray-800 py-2 rounded-b overflow-scroll"}>
                <div className={"w-full border-b-2 px-2 hover:bg-gray-200"} key={-1} onClick={event => handleTagSelection(event, searchString)}>{`Create new tag: ${searchString}`}</div>
                {searchTags!.map((tag, index) => {
                    return (
                        <div className={"w-full border-b-2 px-2 hover:bg-gray-200"} key={index} onClick={event => handleTagSelection(event, tag)}>{tag}</div>
                    )
                })}
            </div>
        )
    }

    const removeTag = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const tagsAfterRemoval = new Set(selectedTags);
        tagsAfterRemoval.delete(event.currentTarget.title);
        setSelectedTags(tagsAfterRemoval);
    }
    const renderSelectedTags = () => {
        if(selectedTags.size === 0){
            return null;
        }else{
            return (
                <div className={"w-full py-4 text-xs flex flex-wrap items-start justify-start"}>
                    {
                        Array.from(selectedTags).map((selectedTag, index) => {
                            return <div className={"rounded-full bg-gray-700 py-1 pl-2 mr-2 mt-2"} key={index}>
                                <span>{selectedTag}</span>
                                <span className={"rounded-full bg-black bg-opacity-10 text-gray-100 w-4 h-4 px-2 py-1 cursor-pointer ml-2"}
                                      title={selectedTag} onClick={event => {removeTag(event)}}>X</span>
                            </div>
                        })
                    }
                </div>
            )
        }
    }

    return (
        <div className={"xl:h-screen w-full xl:w-72 pt-8 pb-8 xl:pt-20 px-4 text-gray-200 bg-gray-900" +
        " flex xl:flex-col xl:justify-start xl:fixed justify-between left-0 top-0 bottom-0"}>
            <div className={"w-2/3 xl:w-full"}>
                <div className={"relative"}>
                    <label className={"uppercase text-lg font-montserrat"}>
                        Add tags
                    </label>
                    <input className={"w-full pt-4 border-b-2 bg-gray-900 focus:outline-none text-sm"} value={searchString} onChange={handleTagSearch}>
                    </input>
                    {
                        renderSearchTags()
                    }

                </div>
                {
                    renderSelectedTags()
                }
            </div>

            <div className={"flex flex-col xl:mt-8 w-1/3 xl:w-full ml-16 xl:ml-0"}>
                <label className={"uppercase text-lg font-montserrat mb-2"}>
                    Level
                </label>
                <div>
                    <div className={"space-x-2 flex items-center"}>
                        <input type="radio" id={`${levels.BEGINNER}`} name="level" value={`${levels.BEGINNER}`}
                               checked={level === levels.BEGINNER}
                               onChange={event => handleLevelSelection(event)}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none"}/>
                        <label htmlFor="male">{`${levels.BEGINNER}`}</label>
                    </div>
                    <div className={"space-x-2 flex items-center"}>
                        <input type="radio" id={`${levels.INTERMEDIATE}`} name="level"
                               checked={level === levels.INTERMEDIATE}
                               value={`${levels.INTERMEDIATE}`} onChange={event => handleLevelSelection(event)}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none"}/>
                        <label htmlFor="female">{`${levels.INTERMEDIATE}`}</label>
                    </div>
                    <div className={"space-x-2 flex items-center"}>
                        <input type="radio" id={`${levels.ADVANCED}`} name="level" value={`${levels.ADVANCED}`}
                               checked={level === levels.ADVANCED}
                               onChange={event => handleLevelSelection(event)}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none"}/>
                        <label htmlFor="other">{`${levels.ADVANCED}`}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagsAndLevels;