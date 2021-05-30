import React, {FC} from "react";

interface IProps{
    level: string
}


const Level:FC<IProps> = ({level}) => {

    const renderLevelSVG = () => {
        if(level.toLowerCase().startsWith("b")){
            return <img className={"w-4 h-8"} src={"/images/beginner.svg"} alt={"0"}/>
        }
        if(level.toLowerCase().startsWith("i")){
            return <img className={"w-4 h-8"} src={"/images/intermediate.svg"} alt={"1"}/>
        }
        if(level.toLowerCase().startsWith("a")){
            return <img className={"w-4 h-8"} src={"/images/advanced.svg"} alt={"2"}/>
        }
        return null
    }

    return <div className={"flex items-end"}>
        <div className={"text-xs text-gray-800 tracking-widest pb-1 pr-2"}>
            {level}
        </div>
        {renderLevelSVG()}
    </div>
}

export default Level;