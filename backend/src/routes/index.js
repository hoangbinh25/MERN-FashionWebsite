const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')
const contactRouter = require('./ContactRouter')
const chatRoute = require('./chatRouter');
const CartRouter = require('./CartRoute');
const blogRouter = require('./BlogRouter');
const OrderRouter = require('./OrderRouter');
const ReportRouter = require('./ReportRouter');

function router(app) {
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contact', contactRouter);
    app.use('/chat', chatRoute);
    app.use('/cart', CartRouter);
    app.use('/blog', blogRouter);
    app.use('/order', OrderRouter);
    app.use('/report', ReportRouter);

}

module.exports = router;
