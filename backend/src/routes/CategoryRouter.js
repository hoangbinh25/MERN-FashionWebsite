const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/getCategories', authMiddleware, CategoryController.getCategories);
router.get('/getCategory/:id', authMiddleware, CategoryController.getCategoryById)
router.post('/create', authMiddleware, CategoryController.createCategory);
router.put('/update/:id', authMiddleware, CategoryController.updateCategory)
router.delete('/delete/:id', authMiddleware, CategoryController.deleteCategory)

module.exports = router
