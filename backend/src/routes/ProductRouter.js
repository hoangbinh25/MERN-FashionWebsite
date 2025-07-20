const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/getProducts', ProductController.getProducts);
router.get('/getProduct/:id', ProductController.getProductById)
router.put('/update-isActive/:id', ProductController.updateProductIsActive);
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct)

router.post(
  "/create",
  upload.array("images", 10),
  authMiddleware,
  ProductController.createProduct
);
router.put(
  "/update/:id",
  upload.array("images", 10),
  authMiddleware,
  ProductController.updateProduct
);

module.exports = router

