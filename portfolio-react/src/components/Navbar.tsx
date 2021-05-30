import React, {FC, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import paths from "../paths";
import {downloadResume} from '../factory/actions/resumeActions'
import {logout} from "../factory/actions/userActions";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {isAdmin, isAuthenticated} from "../auth";

const Navbar: FC = () => {

    const userLoginState = useSelector((state:RootStateOrAny) => state.userLoginState);
    const {userLogin} = userLoginState;
    const {userInfo} = userLogin;
    const dispatch = useDispatch();
    const resumeDownload = useSelector((state: RootStateOrAny) => state.resumeDownload);
    const {downloading, error} = resumeDownload;

    const [isOpen, setIsOpen] = useState(false);

    const handleResumeDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(downloadResume())
    }

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(logout());
    }


    return (
        <nav className="w-full z-30 bg-gray-100 shadow-lg fixed flex flex-col sm:flex-row  justify-between items-center z-20  divide-y sm:divide-y-0 divide-gray-400">
            <li className="block sm:hidden w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200">
                <button onClick={event => setIsOpen(!isOpen)} className={"focus:outline-none"}>
                    {!isOpen ?
                        <svg className={"w-6 h-6"} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg> :
                        <svg className={"w-6 h-6"} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>}
                </button>
            </li>
            <ul className={`${isOpen ? 'flex': 'hidden'} sm:flex flex-col sm:flex-row  items-center h-full md:ml-20 w-full divide-y sm:divide-y-0 divide-gray-400`}>
                <Link to={paths.home} className="w-full sm:w-max p-2 px-4 h-10 flex items-center transition duration-500 transform cursor-pointer hover:bg-gray-200">
                    Home
                </Link>
                <li className="w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200">About</li>
                <button className="w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200 focus:outline-none"
                        onClick={event => handleResumeDownload(event)}>
                    {
                        downloading ?
                            <svg className={"w-4 h-4 animate-bounce"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg> :
                            "Resume"
                    }
                </button>
                <Link  to={paths.allBlogs} className="w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200">
                    Blogs
                </Link>
                {
                    userInfo && isAdmin() &&
                    <Link to={paths.createBlog} className="w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200">
                        Create Blog
                    </Link>
                }
                {
                    userInfo && isAuthenticated() && <button
                        onClick={handleLogout}
                        className="w-full sm:w-max p-2 px-4 h-10 flex items-center cursor-pointer transition duration-500 transform hover:bg-gray-200 focus:outline-none">
                        Logout
                    </button>
                }
            </ul>
            <ul className={`${isOpen ? 'flex': 'hidden'} sm:flex w-full sm:w-max flex sm:mr-20 space-x-2 justify-center`}>
                <a href="https://www.linkedin.com/in/raiyanrazi" className="p-2 cursor-pointer flex flex-shrink-0 items-center" target="_blank">
                    <svg className={"w-6 h-6 cursor-pointer transition duration-500 transform hover:text-blue-700"}  width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                        <path d="M27.8364 0H2.16362C0.968628 0 0 0.968628 0 2.16362V27.8364C0 29.0314 0.968628 30 2.16362 30H27.8364C29.0314 30 30 29.0314 30 27.8364V2.16362C30 0.968628 29.0314 0 27.8364 0V0ZM10.6412 22.6758H6.98799V11.6851H10.6412V22.6758ZM8.8147 10.1843H8.79089C7.565 10.1843 6.77216 9.34044 6.77216 8.28575C6.77216 7.20726 7.58926 6.38672 8.83896 6.38672C10.0887 6.38672 10.8577 7.20726 10.8815 8.28575C10.8815 9.34044 10.0887 10.1843 8.8147 10.1843ZM23.8138 22.6758H20.1611V16.796C20.1611 15.3184 19.6321 14.3106 18.3103 14.3106C17.3012 14.3106 16.7001 14.9904 16.436 15.6466C16.3394 15.8814 16.3158 16.2096 16.3158 16.5381V22.6758H12.6629C12.6629 22.6758 12.7107 12.7162 12.6629 11.6851H16.3158V13.2413C16.8013 12.4924 17.6699 11.4272 19.6081 11.4272C22.0116 11.4272 23.8138 12.998 23.8138 16.3737V22.6758Z"/>
                    </svg>
                </a>
                <a href="https://leetcode.com/raiyanrazi" className="p-2 cursor-pointer flex flex-shrink-0 items-center" target="_blank">
                    <svg className={"w-6 h-6 cursor-pointer transition duration-500 transform hover:text-blue-700"}  width="27" height="30" viewBox="0 0 27 30" fill="currentColor">
                        <path d="M18.9898 22.412L15.3801 25.6699C14.7524 26.2558 13.8924 26.5019 12.9382 26.5019C11.984 26.5019 11.1239 26.2558 10.4962 25.6699L4.69565 20.2206C4.07417 19.6347 3.75401 18.7792 3.75401 17.8885C3.75401 16.9979 4.07417 16.1893 4.69565 15.6092L10.4836 10.1306C11.1051 9.55056 11.9902 9.3279 12.9444 9.3279C13.8986 9.3279 14.7587 9.574 15.3864 10.1599L18.996 13.4178C19.6866 14.0623 20.8291 14.0389 21.5448 13.3709C22.2541 12.7029 22.2855 11.6365 21.595 10.992L18.1046 7.69898C17.2006 6.86108 16.0644 6.28686 14.8277 6.02318L18.1297 2.9001C18.8203 2.25556 18.8014 1.18915 18.0795 0.52117C17.3576 -0.152665 16.2151 -0.176103 15.5245 0.468435L1.99628 13.0955C0.68426 14.326 0 16.0135 0 17.8885C0 19.7577 0.68426 21.5097 1.99628 22.7343L7.8219 28.1836C9.13392 29.4082 10.9482 30 12.957 30C14.9595 30 16.7738 29.3613 18.0921 28.1367L21.5887 24.8378C22.2792 24.1992 22.2541 23.1327 21.5385 22.4648C20.8166 21.7909 19.674 21.7675 18.9898 22.412ZM25.2988 16.2655H11.7015C10.7661 16.2655 10.0002 17.0155 10.0002 17.9471C10.0002 18.8788 10.7661 19.6347 11.7015 19.6347H25.2988C26.2341 19.6347 27 18.8788 27 17.9471C26.9937 17.0155 26.2341 16.2655 25.2988 16.2655Z"/>
                    </svg>
                </a>
                <a href="https://github.com/RaziRaiyan" className="p-2 cursor-pointer flex flex-shrink-0 items-center" target="_blank" >
                    <svg className={"w-6 h-6 cursor-pointer transition duration-500 transform hover:text-blue-700"}  width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                        <path d="M28.3496 1.65024C27.2493 0.550147 25.9248 0 24.375 0H5.62498C4.07564 0 2.75061 0.550147 1.65024 1.65024C0.55015 2.75053 0 4.07555 0 5.62495V24.3751C0 25.9246 0.55015 27.2495 1.65024 28.3496C2.75054 29.4499 4.07564 30 5.62498 30H9.99998C10.2862 30 10.5012 29.9901 10.6444 29.971C10.7875 29.9513 10.9306 29.8666 11.0739 29.7167C11.2173 29.5671 11.2887 29.3489 11.2887 29.0626C11.2887 29.0237 11.2853 28.5806 11.2789 27.7343C11.2723 26.8877 11.269 26.2172 11.269 25.7224L10.8198 25.8006C10.5334 25.8526 10.172 25.8755 9.73578 25.8689C9.29974 25.8623 8.84714 25.8169 8.37846 25.7322C7.90952 25.6475 7.47347 25.4522 7.06979 25.1465C6.66631 24.8402 6.37988 24.44 6.21057 23.9453L6.01519 23.4958C5.885 23.1966 5.68005 22.8644 5.40005 22.5002C5.12005 22.1354 4.8369 21.888 4.55047 21.7578L4.41372 21.6601C4.32267 21.595 4.23804 21.5166 4.15985 21.4255C4.0818 21.3342 4.02324 21.2429 3.98417 21.1521C3.94511 21.0608 3.97754 20.9858 4.0818 20.9271C4.18605 20.8686 4.37466 20.8396 4.64823 20.8396L5.03871 20.8981C5.29921 20.9501 5.62128 21.1062 6.00561 21.3667C6.38966 21.6271 6.70537 21.9656 6.95281 22.3821C7.25244 22.9162 7.61344 23.3228 8.03683 23.6028C8.45987 23.883 8.88641 24.023 9.31602 24.023C9.74563 24.023 10.1167 23.9904 10.4293 23.9256C10.7416 23.8603 11.0346 23.7624 11.3082 23.6323C11.4254 22.76 11.7444 22.089 12.2651 21.6203C11.523 21.5422 10.8557 21.4251 10.2631 21.2687C9.67079 21.1123 9.05873 20.8586 8.42731 20.5069C7.79562 20.1553 7.2716 19.7194 6.85492 19.1982C6.4383 18.6771 6.09639 17.9936 5.82966 17.1475C5.56279 16.3009 5.42933 15.3242 5.42933 14.2176C5.42933 12.6422 5.94384 11.3008 6.97244 10.1941C6.49056 9.0093 6.53606 7.68134 7.10906 6.20985C7.48668 6.0926 8.04668 6.18057 8.78879 6.47357C9.53103 6.76677 10.0745 7.01749 10.4197 7.22552C10.7649 7.43363 11.0414 7.60957 11.2498 7.75296C12.461 7.4144 13.7109 7.24516 14.9999 7.24516C16.2888 7.24516 17.5389 7.4144 18.7502 7.75296L19.4924 7.28422C20.0004 6.97159 20.5992 6.68516 21.2894 6.42486C21.9795 6.1645 22.5068 6.0928 22.8715 6.21006C23.4572 7.68154 23.5096 9.0095 23.0274 10.1943C24.056 11.3011 24.5707 12.6424 24.5707 14.2178C24.5707 15.3246 24.4372 16.3046 24.1703 17.1573C23.9037 18.0101 23.5588 18.6939 23.1353 19.2082C22.7123 19.7226 22.1848 20.1552 21.5534 20.507C20.9218 20.8585 20.3099 21.1127 19.7173 21.2686C19.1248 21.425 18.4576 21.5425 17.7154 21.6207C18.3921 22.2064 18.7305 23.1306 18.7305 24.3939V29.062C18.7305 29.2834 18.7628 29.4623 18.828 29.5991C18.8935 29.7357 18.9975 29.8299 19.1407 29.8823C19.2845 29.9343 19.4108 29.9668 19.5218 29.9798C19.6327 29.9928 19.7919 29.9994 20.0003 29.9994H24.3753C25.9246 29.9994 27.2497 29.4492 28.3496 28.3489C29.4499 27.2486 30 25.9236 30 24.3742V5.62495C29.9999 4.07555 29.4497 2.75033 28.3496 1.65024Z" fill="currentColor"/>
                    </svg>
                </a>
            </ul>
        </nav>
    )
}

export default withRouter(Navbar);