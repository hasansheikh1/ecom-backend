const express = require('express');
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct, addWishlist, rating } = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/:id', getaProduct)
router.put('/wishlist', authMiddleware, addWishlist)
router.put('/wishlist', authMiddleware, rating)
router.get('/', getAllProducts)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
module.exports = router;