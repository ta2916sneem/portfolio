import React, {FC} from "react";
import Layout from "../Layouts/Layout";
import Button from "../components/Button";
import {useHistory} from 'react-router-dom';
import paths from "../paths";

const Error: FC = () => {

    const history = useHistory();

    return (
        <Layout className={"container mx-auto h-screen flex flex-col justify-center items-center text-gray-400"}>
            <h3 className={"text-9xl font-montserrat mb-16 font-bold"}>
                404
            </h3>
            <h4 className={"capitalize text-4xl mb-16"}>Looks like you got lost</h4>
            <Button onClick={event => history.push(paths.home)} isDark={true}>
                Go Home
            </Button>
        </Layout>
    )
}

export default Error;