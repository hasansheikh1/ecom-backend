const BCategory = require("../models/blogCatgModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId")

const createCategory = asyncHandler(async (req, res) => {
    try {

        const newCategory = await BCategory.create(req.body);
        res.json(newCategory)


    } catch (error) {
        throw new Error(error)
    }
})
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const updatedCategory = await BCategory.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updatedCategory)


    } catch (error) {
        throw new Error(error)
    }
})
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const deleteCategory = await BCategory.findByIdAndDelete(id);
        res.json(deleteCategory)


    } catch (error) {
        throw new Error(error)
    }
})

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getCategory = await BCategory.findById(id)
        res.json(getCategory);

    } catch (error) {
        throw new Error(error)
    }


})


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
};
