const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')
const contactRouter = require('./ContactRouter')
const chatRoute = require('./chatRouter');
const CartRouter = require('./CartRoute');
const OrderRouter = require('./OrderRouter');

function router(app) {
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contact', contactRouter);
    app.use('/chat', chatRoute);
    app.use('/cart', CartRouter);
    app.use('/order', OrderRouter);
}

module.exports = router;
