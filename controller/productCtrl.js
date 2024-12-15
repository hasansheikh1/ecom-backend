const Product = require('../models/productModel');
const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploading = require("../utils/cloudinary")


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
            query = query.sort(sortBy)

        }
        else {
            query = query.sort('-createdAt')
        }

        //limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        }
        else {
            query = query.select('-__v')
        }


        //pagination

        const page = req.query.page;
        const limit = req.query.limit;

        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productsCount = await Product.countDocuments()
            if (skip >= productsCount) throw new Error("This Page Does'nt Exist")
        }

        console.log("pagination req ", page, limit, skip)

        const product = await query;
        res.json(product);

    } catch (error) {
        throw new Error(error);
    }

})


const addWishlist = asyncHandler(async (req, res) => {

    const { _id } = req.user;

    const { prodId } = req.body;

    const user = await User.findById(_id)
    productCheck = user?.wishlist?.find((id) => (id == prodId));

    if (productCheck) {

        const user = await User.findByIdAndUpdate(_id, {
            $pull: { wishlist: prodId }
        }, {
            new: true
        })
        res.json(user)
    }
    else {
        const user = await User.findByIdAndUpdate(_id, {
            $push: { wishlist: prodId }
        }, { new: true })

        res.json(user)
    }

})

const rating = asyncHandler(async (req, res) => {

    const { id } = req.user;
    const { star, prodId, comment } = req.body
    console.log("userId", id)
    try {

        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((user) => user.postedby.toString() == id.toString())
        // console.log("ss", alreadyRated)


        if (alreadyRated) {
            const update_rating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment }
                },
                { new: true }
            );

        }
        else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: id,
                        }
                    }
                }, { new: true }
            )

        }

        const getAllRatings = await Product.findById(prodId);
        let totalRating = getAllRatings.ratings.length;
        let sumRating = getAllRatings.ratings.map((item) => item?.star).reduce((prev, curr) => prev + curr, 0);
        // console.log("sum", sumRating)
        let actualRating = Math.round(sumRating / totalRating);
        console.log("check", actualRating)

        let finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalRatings: actualRating
        }, { new: true })

        res.json({ finalProduct })
    }
    catch (error) {
        throw new Error(error)
    }


})

const productsRatedByUser = asyncHandler(async (req, res) => {

    const { id } = req.user;
    const { star, prodId } = req.body
    console.log("userId", id)
    try {

        // const product = await Product.findById(prodId);
        // let alreadyRated = product.ratings.find((user) => user.postedby.toString() == id.toString())
        // console.log("ss", alreadyRated)

        const listCheck = await Product.find({
            ratings: { $elemMatch: { postedby: id } }
        })

        // console.log("user rated list",listCheck)
        res.json(listCheck)


    }
    catch (error) {
        throw new Error(error)
    }



})


const getAllRatings = asyncHandler(async (req, res) => {

})

const uploadImages = asyncHandler(async(req,res)=>{
    console.log("images ",req.files)
    const {id}= req.params;
    validateMongoDbId(id);
    try {
            const uploader = (path)=>cloudinaryUploading(path,"images");
            const urls = [];
            const files = req.files;
            for(const file of files){
                const {path}=file;
                const newpath = await uploader(path)
                urls.push(newpath);
            }
            const findProduct = await Product.findByIdAndUpdate(id,{
                images:urls.map((file)=>{
                    return file;
                })
            },
{        new:true
}
)
 res.json(findProduct)
} catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createProduct,
    updateProduct, deleteProduct,
    getaProduct, getAllProducts,
    addWishlist,
    rating,
    productsRatedByUser,
    uploadImages
}