import express from 'express';
import {createProfile,getProfile, getAvatar, getResume} from '../controllers/profile'
const profileRouter = express.Router();

profileRouter.post('/', createProfile);
profileRouter.get('/', getProfile);
profileRouter.get('/avatar', getAvatar);
profileRouter.get('/resume', getResume);

export default profileRouter;