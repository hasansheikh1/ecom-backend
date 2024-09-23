const express = require('express');
const { createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getBrands } = require('../controller/brandCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand)
router.delete("/:id", authMiddleware, isAdmin, deleteBrand)
router.get("/:id", authMiddleware, isAdmin, getBrand)
router.get("/", authMiddleware, isAdmin, getBrands)


module.exports = router;