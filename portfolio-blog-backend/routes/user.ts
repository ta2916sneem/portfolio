import * as express from 'express'
import {userById, read, update, userByEmail } from '../controllers/user'
import {requireSignin, isAuth, isAdmin} from '../controllers/auth'

const userRouter = express.Router();

// User routes
userRouter.get('/:userId', requireSignin, isAuth, read);
userRouter.put('/:userId', requireSignin, isAuth, update);

userRouter.param('userId', userById);

export default userRouter;