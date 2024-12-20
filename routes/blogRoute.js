const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog } = require('../controller/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislike', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/blogs', getAllBlogs);
router.get('/:id', getBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)

module.exports = router;