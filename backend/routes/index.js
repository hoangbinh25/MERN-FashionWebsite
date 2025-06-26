const homeRouter = require('./home')

function router(app) {
    app.use('/', homeRouter)
}

module.exports = router