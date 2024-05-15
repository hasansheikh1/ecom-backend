const express = require('express');
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct } = require('../controller/productCtrl');

const router = express.Router();


router.post('/', createProduct)
router.get('/:id', getaProduct)
router.get('/', getAllProducts)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
module.exports = router;