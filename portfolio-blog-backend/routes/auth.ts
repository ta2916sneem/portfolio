import express from 'express';
const authRouter = express.Router();

import {signUp, signIn, logOut, requireSignin} from '../controllers/auth'
import {signUpValidator}  from '../validator';

authRouter.post('/signup', signUpValidator, signUp);
authRouter.post('/login', signIn);
authRouter.get('/logOut', logOut);

// Admin route
authRouter.get('/hello', requireSignin,  (req, res) => {
    res.send("Hello there");
})

export default authRouter;