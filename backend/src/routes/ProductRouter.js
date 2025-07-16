const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { validateProduct } = require('../middleware/validationMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/getProducts', authMiddleware, ProductController.getProducts);
router.get('/getProduct/:id', authMiddleware, ProductController.getProductById)
//router.post('/create', validateProduct, ProductController.createProduct);
//router.put('/update/:id', ProductController.updateProduct)
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct)

router.post(
  "/create",
  upload.array("images", 10),
  ProductController.createProduct
);
router.put(
  "/update/:id",
  upload.array("images", 10),
  ProductController.updateProduct
);

module.exports = router

