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
        const getAllProducts = await Product.find(req.query);
        res.json(getAllProducts);

    } catch (error) {
        throw new Error(error)
    }


})

module.exports = { createProduct, updateProduct, deleteProduct, getaProduct, getAllProducts }