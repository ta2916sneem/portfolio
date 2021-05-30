import React, {FC} from "react";
import Navbar from "../components/Navbar";

interface Props {
    className?: string
}

const Layout: FC<Props> = ({className,
                               children}) => {
    return <div className={"relative"}>
        <Navbar/>
        <div className={className ? `${className} pt-16` : `pt-16`}>
            {children}
        </div>
    </div>
}

export default Layout;