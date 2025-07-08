class HomeController {

    // [GET] /
    index(req, res) {
        res.send('Hello World')
    }

    // [GET] /api/test
}

module.exports = new HomeController
