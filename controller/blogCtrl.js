const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const validateMongoDbId = require('../utils/validateMongodbId');

const createBlog = asyncHandler(async (req, res) => {

    try {

        const newBlog = await Blog.create(req.body)
        res.json({
            status: "success",
            newBlog,
        })

    }
    catch (error) {
        throw new Error("Blog Controller Error", error)
    }

})
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {

        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updateBlog)

    }
    catch (error) {
        throw new Error("Blog Controller Error", error)
    }

})

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const getBlog = await Blog.findById(id)
        await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 },

        },

            { new: true })

        res.json(getBlog)

    }
    catch (error) {
        throw new Error("Blog Controller Error", error)
    }

})

const getAllBlogs = asyncHandler(async (req, res) => {

    try {

        const getBlogs = await Blog.find();
        res.json(getBlogs)

    }
    catch (error) {
        throw new Error("Blog Error", error)
    }

})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {

        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.json({
            message: 'Blog Deleted Successfully',
            deletedBlog
        })

    }
    catch (error) {
        throw new Error("Blog Controller Error", error)
    }

})


const likeBlog = asyncHandler(async (req, res) => {

    const { blogId } = req.body;
    console.log("Req ", req.body);

    validateMongoDbId(blogId);
    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id;

    const isLiked = blog?.isLiked
    console.log("like check", isLiked)
    const alreadyDisliked = blog?.dislikes.find(
        (userId) => userId?.toString() === loginUserId?.toString());

    console.log("check dislike", alreadyDisliked)
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        },
            { new: true }

        );
        res.json(blog);
    };

    if (isLiked) {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
            { new: true }

        );
        res.json(blog);
    }
    else {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        },
            { new: true }

        );
        res.json(blog);

    }



})

const dislikeBlog = asyncHandler(async (req, res) => {

    const { blogId } = req.body;

    validateMongoDbId(blogId);
    // const blog = await Blog.findById(blogId).
    //     populate('likes', 'firstname email').exec();
    const blog = await Blog.findById(blogId)
    // console.log("check", blog)
    const loginUserId = req?.user?._id;

    const isDisliked = blog?.isDisliked;

    const alreadyLiked = await blog?.likes.find(
        (userId) => userId?.toString() === loginUserId?.toString());
    // console.log("likes", alreadyLiked)

    if (alreadyLiked) {
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId }
        })

        // console.log("dislike", blog)
    }

    let blogg;

    if (!isDisliked) {
        blogg = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true
        }, { new: true }
        )

    }
    else {
        blogg = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        }, { new: true }
        )
    }

    res.json(blogg)

})

module.exports = {
    createBlog,
    updateBlog, getBlog, getAllBlogs, deleteBlog,
    likeBlog,
    dislikeBlog
};