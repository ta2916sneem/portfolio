import React, {FC, useState} from "react";

interface IProjectCard{
    imageLink: string,
    title: string,
    technologies: string[],
    projectUrl: string
}

const ProjectCard: FC<IProjectCard> = (props) => {

    const [display, setDisplay] = useState(false);

    const {imageLink, title, technologies, projectUrl} = props;

    return <div className={"group w-full relative flex flex-col divide-y " +
    "font-montserrat shadow-mdBlue rounded transition duration-500 transform hover:shadow-xlBlue"}>
        <div className={"bg-cover bg-center h-64 rounded-t mb-2"} style={{backgroundImage: `url(${imageLink})`}}/>
        <div onMouseOver={event => setDisplay(true)} onMouseOut={event => setDisplay(false)}
             className={"transition duration-500 transform bg-black sm:group-hover:bg-opacity-50 h-64" +
             " w-full z-20 rounded-t bg-opacity-50 sm:bg-opacity-0 absolute top-0 flex justify-center items-center"}>
            <a href={projectUrl} target="_blank" rel={"noreferrer"} className={`sm:${display ? "block": "hidden"}  p-4 text-lg text-gray-100 transition duration-500 transform border-2 border-gray-100`}>Live Preview</a>
        </div>
        <div className={"p-4 divide-y"}>
            <h2 className={"text-xl font-bold text-gray-700 text-center"}>{title}</h2>
            <ul className={"space-y-2 flex flex-col text-center tracking-widest pt-4"}>
                {
                    technologies.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>
    </div>
}

export default ProjectCard;