const AuthService = require('../services/AuthService');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);
        if (!email || !password) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is required'
            })

        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is email'
            })
        }

        const loginUser = await AuthService.loginUser(req.body);
        res.json(loginUser)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.registerUser = async (req, res) => {

}

