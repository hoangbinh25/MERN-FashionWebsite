const express = require('express')
const router = express.Router();
const upload = require('../middleware/upload');

const BlogController = require('../controllers/BlogController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/getBlogs', BlogController.getBlogs)
router.get('/getBlog/:id', BlogController.getBlogById)

router.post(
    '/create',
    upload.single("image"),
    authMiddleware,
    BlogController.createBlog
)

router.put(
    '/update/:id',
    upload.single("image"),
    authMiddleware,
    BlogController.updateBlog
)

router.delete('/delete/:id', authMiddleware, BlogController.deleteBlog)

module.exports = router;
