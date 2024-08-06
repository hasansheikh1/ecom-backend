const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, updateBlog, getBlog, getAllBlogs } = require('../controller/blogCtrl');
const router = express.Router();


router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/blogs', getAllBlogs);
router.get('/:id', getBlog);

module.exports = router;