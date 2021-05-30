import React, {FC} from 'react';

const Footer: FC  = () => {
    return <div className="w-screen bg-trueGray-900">
        <div className={"container text-gray-200 "}>
            <div className={"text-2xl font-montserrat text-center py-6"}>
                <span className={"border-b-2 border-gray-400"}>
                    Technologies I have worked on
                </span>
            </div>
            <div className={"flex justify-center items-center flex-wrap"}>
                <img src={"/images/react_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"reactJS"}/>
                <img src={"/images/nextjs_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"nextJS"}/>
                <img src={"/images/node_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"nodeJS"}/>
                <img src={"/images/javascript_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"Javascript"}/>
                <img src={"/images/postman_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"postman"}/>
                <img src={"/images/java_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"java"}/>
                <img src={"/images/mysql_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"mysql"}/>
                <img src={"/images/postgres_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"postgres"}/>
                <img src={"/images/python_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"python"}/>
                <img src={"/images/github_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"github"}/>
                <img src={"/images/aws_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"aws"}/>
                <img src={"/images/mongo_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"mongo"}/>
                <img src={"/images/docker_icon.svg"} className={"px-2 my-6 py-4 w-1/5 h-24"} alt={"docker"}/>
            </div>
        </div>
    </div>
}

export default Footer