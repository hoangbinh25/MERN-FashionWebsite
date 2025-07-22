const express = require('express');
const router = express.Router();

const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')
const contactRouter = require('./ContactRouter')
const chatRoute = require('./chatRouter');
const CartRouter = require('./CartRoute');
const blogRouter = require('./BlogRouter');
const OrderRouter = require('./OrderRouter');


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/contact', contactRouter);
router.use('/chat', chatRoute);
router.use('/cart', CartRouter);
router.use('/blog', blogRouter);
router.use('/order', OrderRouter);

module.exports = router;
