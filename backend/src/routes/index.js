const homeRouter = require('./HomeRouter');
const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')

function router(app) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
}

module.exports = router;
