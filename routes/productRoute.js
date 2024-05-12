const express = require('express');
const { createProduct, getaProduct, getAllProducts, updateProduct } = require('../controller/productCtrl');

const router = express.Router();


router.post('/', createProduct)
router.get('/:id', getaProduct)
router.get('/', getAllProducts)
router.put('/:id', updateProduct)
module.exports = router;