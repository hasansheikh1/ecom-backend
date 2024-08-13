const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog } = require('../controller/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/blogs', getAllBlogs);
router.get('/:id', getBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.put('/likes', authMiddleware, isAdmin, likeBlog)
module.exports = router;