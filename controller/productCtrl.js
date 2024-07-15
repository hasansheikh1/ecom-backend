const Product = require('../models/productModel');
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")

const createProduct = asyncHandler(async (req, res) => {

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)

        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }

})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    console.log("id ", id)
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findOneAndUpdate({ id },
            req.body,
            { new: true }
        )
        res.json(updateProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {

        const deleteProduct = await Product.findOneAndDelete({ _id: id });
        console.log("delete product", deleteProduct)
        if (!deleteProduct) {
            // If no product was found with that ID, return a 404 status
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(deleteProduct)

    } catch (error) {
        throw new Error(error)
    }

})

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct)
    }
    catch (error) {
        throw new Error(error);
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    // console.log("req query",req.query)
    try {

        const queryObj = { ...req.query };
        console.log("query Obj ", queryObj)
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach((el) => delete queryObj[el])
        console.log("query object after filter", queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|g|lte|lt)\b/g, (match) => `$${match}`)

        let query = Product.find(JSON.parse(queryStr))
        // console.log("cc", JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ")
            console.log('sort by', sortBy)
            query = query.sort(sortBy)
            console.log("after", query)
        }
        else {
            query = query.sort('-createdAt')
        }



        const product = await query;
        res.json(product);

    } catch (error) {
        throw new Error(error);
    }

})

module.exports = { createProduct, updateProduct, deleteProduct, getaProduct, getAllProducts }