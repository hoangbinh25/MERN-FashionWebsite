const express = require("express");
const router = express.Router();

const CartController = require("../controllers/CartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:idUser", CartController.getCartByUser);
router.post("/addProduct", CartController.addProductToCart);
router.delete("/deleteProduct", CartController.deleteProductFromCart);
router.put("/updateQuantity", CartController.updateQuantityInCart);

module.exports = router