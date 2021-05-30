import React, {FC} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAdmin, isAuthenticated} from "./index";
import paths from "../paths";

const AdminRoute: FC<any> = ({children, ...rest}) => {

    if(!isAdmin()){
        return <Redirect to={paths.home} />;
    }

    return (<Route {...rest} />);
}

export default AdminRoute;