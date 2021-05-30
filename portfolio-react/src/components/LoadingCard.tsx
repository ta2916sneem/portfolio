import React, {FC} from "react";

interface IProps{
    animate: string
}

const LoadingCard: FC<IProps> = ({animate}) => {
    return (
        <div className={`h-64 w-full rounded flex flex-col p-8 ${animate}`}>
            <div className={"flex space-x-4 w-full mb-2"}>
                <div className={"w-1/2 rounded-lg h-8 bg-gray-400 mb-4"}/>
                <div className={"w-1/3 rounded-lg h-8 bg-gray-400 mb-4"}/>
            </div>
            <div className={"flex space-x-4 w-full mb-2"}>
                <div className={"w-1/3 rounded-lg h-6 bg-gray-400 mb-4"}/>
                <div className={"w-1/3 rounded-lg h-6 bg-gray-400 mb-4"}/>
                <div className={"w-1/3 rounded-lg h-6 bg-gray-400 mb-4"}/>
            </div>
            <div className={"flex space-x-4 w-full"}>
                <div className={"w-1/2 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/3 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/2 rounded-lg h-4 bg-gray-400 mb-4"}/>
            </div>

            <div className={"flex space-x-4 w-full"}>
                <div className={"w-1/5 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/4 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/4 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/4 rounded-lg h-4 bg-gray-400 mb-4"}/>
            </div>

            <div className={"flex space-x-4 w-full mb-8"}>
                <div className={"w-1/2 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/3 rounded-lg h-4 bg-gray-400 mb-4"}/>
                <div className={"w-1/2 rounded-lg h-4 bg-gray-400"}/>
            </div>
        </div>
    )
}

export default LoadingCard;