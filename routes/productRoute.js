const express = require('express');
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct, addWishlist, rating, uploadImages } = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');
const router = express.Router();


router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/upload/:id',authMiddleware,isAdmin,
    uploadPhoto.array("images",5),
productImgResize,uploadImages
)
router.get('/:id', getaProduct)
router.put('/wishlist', authMiddleware, addWishlist)
router.put('/rating', authMiddleware, rating)
router.get('/', getAllProducts)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
module.exports = router;