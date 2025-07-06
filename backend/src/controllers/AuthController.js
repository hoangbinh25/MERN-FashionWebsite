const AuthService = require('../services/AuthService');
const JwtService = require('../services/JwtService')

const loginUser = async (req, res) => {
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
        return res.status(500).json({ error: error.message });
    }

}

const registerUser = async (req, res) => {

}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                status: 'Error',
                message: 'Invalid token'
            })
        }

        const response = await JwtService.refreshTokenJwt(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    loginUser,
    registerUser,
    refreshToken,
}

