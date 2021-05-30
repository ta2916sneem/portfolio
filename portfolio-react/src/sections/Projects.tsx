import React, {FC} from 'react'
import ProjectCard from "../components/ProjectCard";

const Projects: FC = () => {
    return (
        <div className={" lg:px-16 py-4"}>
            <div className="mb-4 text-2xl font-montserrat border-b-2 text-gray-600 border-gray-600 inline-block">
                Projects
            </div>
            <div className={"mb-4 font-montserrat text-gray-400 text-xs"}>I will be hosting rest of the projects soon</div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                <ProjectCard imageLink={"https://firebasestorage.googleapis.com/v0/b/portfolio-16407.appspot.com/o/Screenshot%202020-12-10%20at%203.53.20%20PM.png?alt=media&token=d2ec1570-45c6-4c9f-ac54-afe4a50dfe21"}
                             projectUrl={"https://electronicsecommerce.herokuapp.com/"}
                             title={"Electronics E Commerce store"}
                             technologies={["ReactJS", "NodeJS", "MongoDB", "Redux"]}
                />
                <ProjectCard imageLink={"https://firebasestorage.googleapis.com/v0/b/portfolio-16407.appspot.com/o/tictactoe_image.png?alt=media&token=9b3a4fb0-b793-49ff-b40b-65156a090504"}
                             projectUrl={"https://tic-tac-toe-next.herokuapp.com/"}
                             title={"Tic Tac Toe"}
                             technologies={["Server Side Rendering","Minimax Algorithm", "NextJS", "Jest"]}
                />
                <ProjectCard imageLink={"https://firebasestorage.googleapis.com/v0/b/portfolio-16407.appspot.com/o/tank_war_img.png?alt=media&token=4d95b63f-3252-48c7-84d7-10a078a2d7dc"}
                             projectUrl={"https://editor.p5js.org/raiyan_razi/sketches/B9YCOeabT    "}
                             title={"Tank War Game"}
                             technologies={["Vanilla JS","Vector calculations", "P5.js", "Two Players Game"]}
                />
            </div>
        </div>
    )
}

export default Projects;