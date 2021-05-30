import React, {useState, Dispatch} from 'react';
import Layout from "../Layouts/Layout";
import Header from "../sections/Header";
import About from "../sections/About";
import Footer from "../sections/Footer";
import HomeBlogs from "../sections/HomeBlogs";
import Projects from "../sections/Projects";


const Home: React.FC = () => {
    return (
        <>
            <Layout className={"container mx-auto"}>
                <Header/>
                <About/>
                <HomeBlogs/>
                <Projects/>
            </Layout>
            <Footer/>
        </>
    );
}

export default Home;
