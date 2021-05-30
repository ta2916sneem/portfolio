import React, {FC} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CreateBlog from "./screens/CreateBlog";
import Home from "./screens/Home";
import AllBlogs from "./screens/AllBlogs";
import paths from "./paths";
import ReadBlog from "./screens/ReadBlog";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import AdminRoute from "./auth/AdminRoute";
import EditBlog from "./screens/EditBlog";
import Error from './screens/Error';

const Routes: FC  = () => {

    return (
        <BrowserRouter >
            <Switch>
                <Route path={paths.home} exact component={Home}/>
                <Route path={paths.allBlogs} exact component={AllBlogs}/>
                <AdminRoute path={paths.createBlog} exact component={CreateBlog}/>
                <Route path={paths.readBlog} exact component={ReadBlog}/>
                <Route path={paths.login} exact component={Login}/>
                <Route path={paths.signup} exact component={SignUp}/>
                <AdminRoute path={paths.editBlog} exact component={EditBlog}/>
                <Route component={Error}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;