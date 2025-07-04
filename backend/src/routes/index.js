const homeRouter = require('./HomeRouter');
const userRouter = require('./UserRouter');
const authRouter = require('./AuthRouter');

function router(app) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
}

module.exports = router;
