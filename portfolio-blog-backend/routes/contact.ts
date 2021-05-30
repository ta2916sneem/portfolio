import express from 'express';
import {contactSubmit} from '../controllers/contact'

const contactRouter = express.Router();

contactRouter.post('/', contactSubmit)

export default contactRouter;