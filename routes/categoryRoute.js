const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory } = require('../controller/categoryCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory)
router.delete("/:id", authMiddleware, isAdmin, deleteCategory)
router.get("/:id", authMiddleware, isAdmin, getCategory)


module.exports = router;