class HomeController {

    // [GET] /
    index(req, res) {
        res.send('Hello World')
    }

    // [POST] /api/test
    test(req, res) {
        const { name, email } = req.body;
        console.log('Dữ liệu nhận được từ client: ', { name, email });

        res.json(
            {
                success: true,
                message: 'Dữ liệu đã nhận!',
                data:
                {
                    name,
                    email
                }
            })

    }
}

module.exports = new HomeController
