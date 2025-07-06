const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/getCategories', CategoryController.getCategories);
router.get('/getCategory/:id', CategoryController.getCategoryById)
router.post('/create', CategoryController.createCategory);
router.put('/update/:id', CategoryController.updateCategory)
router.delete('/delete/:id', CategoryController.deleteCategory)

module.exports = router
