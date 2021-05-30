import React, {FC} from 'react';

interface Props{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    isDark?: boolean,
    type?: "button" | "submit" | "reset" | undefined
}


const Button: FC<Props>  = ({onClick, isDark, type, children}) => {
    return (
        <button className={`rounded-full shadow-mdBlue uppercase px-4 py-2 flex items-center
             transition duration-500 transform hover:-translate-y-1
            font-montserrat font-semibold focus:outline-none hover:shadow-xlBlue transition-all
            border-gray-100 border-2 capitalize text-xs sm:text-sm
            ${isDark && "bg-gray-800 text-gray-100"}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;