const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const validateMongoDbId = require('../utils/validateMongodbId');

const createBlog = asyncHandler(async (rq, res) => {

})

module.exports = { createBlog };