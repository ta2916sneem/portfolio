import express from 'express';
const blogRouter = express.Router();
import {createBlog, getAllBlog, getBlogById, searchBlog,
    publishBlog, updateBlog, deleteBlog,
    incrementApplauds, tagsAutoComplete} from "../controllers/blogs"

import {requireSignin, isAuth, isAdmin} from '../controllers/auth'
import {userById} from '../controllers/user'

// General routes
blogRouter.get("/", getAllBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.put('/:id/applaud', incrementApplauds);
blogRouter.get("/tags/:search", tagsAutoComplete);
blogRouter.get("/search/:search", searchBlog);

// Admin routes
blogRouter.post("/createblog/:userId", requireSignin, isAuth, isAdmin, createBlog);
blogRouter.put("/publish/:userId", requireSignin, isAuth, isAdmin, publishBlog);
blogRouter.put("/update/:userId", requireSignin, isAuth, isAdmin, updateBlog);
blogRouter.delete("/delete/:userId", requireSignin, isAuth, isAdmin, deleteBlog);


blogRouter.param('userId', userById);

export default blogRouter;