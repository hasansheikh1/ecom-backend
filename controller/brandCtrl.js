const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId")

const createBrand = asyncHandler(async (req, res) => {
    try {

        const newBrand = await Brand.create(req.body);
        res.json(newBrand)


    } catch (error) {
        throw new Error(error)
    }
})
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updatedBrand)


    } catch (error) {
        throw new Error(error)
    }
})
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBrand = await Brand.findById(id)
        res.json(getBrand);

    } catch (error) {
        throw new Error(error)
    }


})
const getBrands = asyncHandler(async (req, res) => {

    try {
        const getBrands = await Brand.find()
        res.json(getBrands);

    } catch (error) {
        throw new Error(error)
    }


})


module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getBrands
};
