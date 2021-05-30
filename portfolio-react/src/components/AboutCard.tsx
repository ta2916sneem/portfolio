import React, {FC} from 'react';

interface Props {
    data: string,
    text: string,
    textColor: string
}


const AboutCard: FC<Props> = ({data, text, textColor}) => {

    const getTextSize = () => {
        if(!text){
            return "";
        }
        let textLength = text.length;
        if(textLength <= 50 ){
            return "text-xs"
        }
        return "text-xxs";
    }

    return (
        <div className="flex flex-col w-2/3 sm:w-64 h-48 rounded-lg shadow-mdBlue ring-1 ring-blue-50
          transition duration-500 transform cursor-pointer
          hover:shadow-xlBlue
         divide-blue-900 p-4 m-2">
            <div className={`text-center text-6xl font-montserrat font-semibold py-6
                border-b-2 border-gray-300 ${textColor ? textColor : "text-gray-600"}`}>
                {data.replace("+", "")}
                <span className={"text-2xl"}>{data.includes("+") && "+"}</span>
            </div>
            <div className={`text-center font-hairline text-sm text-gray-700 pt-2 ${getTextSize()}`}>
                {text}
            </div>
        </div>
    )
}

export default AboutCard