import Blog ,{IBlog} from "../models/blog";
import Tags, {ITag} from "../models/tags";
import {Request, Response} from "express";
import {uploadErrorMessage} from '../error_handlers/_blog';

export const tagsAutoComplete = async (req: Request, res: Response) => {
    const searchString = req.params.search;
    try{
        const result = await Tags.aggregate([
            {
                $search: {
                    "autocomplete": {
                        "path": "name",
                        "query": searchString
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    _id: 0
                }
            }
        ]);
        res.status(200).json(result);
    }catch (error){
        return res.status(400).json({
            message: "Something went wrong for tags autocompletion",
            error
        })
    }
}

export const searchBlog = async (req: Request, res: Response) => {
    const searchTerm = req.params.search;
    const includeOnlyPublishedResult = req.query.isPublished;

    let aggregationPipeline: any = [
        {
            $search: {
                "compound": {
                    "should": [
                        {
                            "text": {
                                "query": searchTerm,
                                "path": "tags"
                            }
                        },
                        {
                            "text": {
                                "query": searchTerm,
                                "path": "description"
                            }
                        },
                        {
                            "text": {
                                "query": searchTerm,
                                "path": "title"
                            }
                        }],
                    "minimumShouldMatch": 1
                }
            }
        },
        {
            $project: {
                content: 0
            }
        }
    ];

    if(includeOnlyPublishedResult){
        aggregationPipeline = [
            {
                $search: {
                    "compound": {
                        "should": [
                            {
                                "text": {
                                    "query": searchTerm,
                                    "path": "tags"
                                }
                            },
                            {
                                "text": {
                                    "query": searchTerm,
                                    "path": "description"
                                }
                            },
                            {
                                "text": {
                                    "query": searchTerm,
                                    "path": "title"
                                }
                            }],
                        "minimumShouldMatch": 1
                    }
                }
            },
            {
               $match: {
                   isPublished: true
               }
            },
            {
                $project: {
                    content: 0
                }
            }
        ]
    }

    try {
        const result = await Blog.aggregate(aggregationPipeline);

        res.status(200).json(result);
    }catch (error){
        res.status(400).json({
            message: "Something went wrong while searching",
            error
        })
    }
}

export const createBlog = async (req: Request, res: Response) => {
    const blog: IBlog = new Blog(req.body);
    try{
        const result = await blog.save();
        await insertTags(blog.tags);
        res.status(201).json({
            result
        });
    }catch (error){
        return res.status(400).json({
            message: uploadErrorMessage(error.errors),
            error
        });
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    const newBlog = req.body;
    console.log(newBlog);
    const {_id, title, description, content, level, tags} = newBlog;
    if(!(_id as any).match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            message: "Please provide a valid _id ",
            _id
        })
    }

    const updateTitle = title ? {title} : {};
    const updateDescription = description ? {description} : {};
    const updateContent = title ? {content} : {};
    const updateLevel = title ? {level} : {};
    const updateTags = tags ? {tags: tags} : {};

    try{
        const result = await Blog.updateOne({_id: _id}, {
            $set: {...updateTitle, ...updateDescription, ...updateContent, ...updateLevel, ...updateTags}
        }, {new: true});
        console.log(result);
        res.status(200).json(result);
    }catch (error){
        res.status(400).json({
            message: "Something went wrong while updating the blog",
            error
        })
    }
}

const insertTags = async (tags: ITag[]) => {
    try{
        const allTags = tags.map(tag => {
            return {
                name: tag
            }
        });
        await Tags.insertMany(allTags, {ordered:false});
    }catch (error){
        console.log(error);
    }
}

export const publishBlog = async (req: Request, res: Response) => {
    const {_id, publish} = req.query;
    if(publish === undefined){
        return res.status(400).json({
            message: "Please provide a publish state"
        })
    }
    if(!(_id as any).match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            message: "Please provide a valid _id query",
            _id
        })
    }
    let toPublish = false;
    if(publish === "true"){
        toPublish = true;
    }
    try{

        interface IUpdateQuery {
            $set: {
                isPublished: boolean,
                publishedOn? : Date
            }
        }

        let updateQuery: IUpdateQuery = {
            $set: {
                isPublished: toPublish,
                publishedOn: new Date()
            }
        }

        if(!toPublish){
            updateQuery = {
                $set: {
                    isPublished: toPublish,
                    publishedOn: undefined
                }
            }
        }

        const result = await Blog.findOneAndUpdate({_id: _id}, updateQuery, {new: true});

        res.status(200).json(result)
    }catch (error){
        res.status(400).json({
            message: uploadErrorMessage(error),
            error,
            errorMessage: error.message
        })
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    const {_id} = req.query;
    if(!(_id as any).match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            message: "Please provide a valid _id query",
            _id
        })
    }
    try{
        const result = await Blog.deleteOne({_id: _id});
        res.status(200).json(result)
    }catch (error){
        res.status(400).json({
            message: uploadErrorMessage(error),
            error,
            errorMessage: error.message
        })
    }
}

export const getAllBlog = async (req: Request, res: Response) => {
    let sortBy = req.query.sortBy ? ""+req.query.sortBy : "_id";
    let skip = req.query.skip ? parseInt(""+req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(""+req.query.limit) : 100;
    let isPublished = req.query.isPublished ? (req.query.isPublished === "true") : "all";


    try{
        const aggregationPipeline: {}[] = [
            {
                $project: {
                    content: 0
                }
            },
            {
                $sort: {
                    [sortBy]: -1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ];
        if(isPublished !== "all"){
            aggregationPipeline.unshift({
                $match: {
                    isPublished: isPublished
                }
            })
        }
        const results = await Blog.aggregate(aggregationPipeline);
        // const results = await Blog.find({}, {content: 0});
        res.status(200).json(results);
    }catch (error){
        return res.status(400).json({
            message: "Error Fetching all blogs",
            error
        })
    }
}

export const getBlogById = async (req: Request, res: Response) => {
    const blogId = req.params.id;
    try{
        const result = await Blog.findOne({_id: blogId});
        res.status(200).json(result);
    }catch (error){
        return res.status(400).json({
            message: `Error Fetching data with id ${blogId}`,
            error
        })
    }
}

export const incrementApplauds = async (req: Request, res: Response) => {
    const blogId = req.params.id;
    try{
        let result = await Blog.findOneAndUpdate({_id: blogId}, {$inc: {applauds: 1}}, {new: true});
        res.status(201).json(result)
    }catch (error){
        return res.status(400).json({
            message: "Can't increment applaud",
            error
        })
    }
}