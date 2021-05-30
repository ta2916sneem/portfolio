import React, {FC} from 'react'
import AboutCard from "../components/AboutCard";

const About: FC = () => {
    return (
        <div className={" lg:px-16 py-4"}>
            <div className="mb-4 text-2xl font-montserrat border-b-2 text-gray-600 border-gray-600 inline-block">
                About Me
            </div>
            <div className="flex justify-center items-center pt-2 flex-wrap">
                <AboutCard data="450+" text="I have solved more  than 450 problems on leetcode" textColor={"text-green-500"}/>
                <AboutCard data="8" text="I have a total of 8 months of experience." textColor={"text-yellow-500"}/>
                <AboutCard data="15+" text="I have worked on more than 15 projects ranging from small to large scale" textColor={"text-indigo-500"}/>
                <AboutCard data="20+" text="I have written more than 20 technical blogs" textColor={"text-red-500"}/>
            </div>
        </div>
    )
}

export default About;