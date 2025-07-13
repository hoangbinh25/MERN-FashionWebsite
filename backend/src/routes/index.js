const homeRouter = require('./HomeRouter');
const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')
const contactRouter = require('./ContactRouter')
const chatRoute = require('./chatRouter');

function router(app) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contact', contactRouter);
    app.use('/chat', chatRoute);
}

module.exports = router;
