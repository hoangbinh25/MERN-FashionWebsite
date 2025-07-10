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
    try {
        const result = await AuthService.registerUser(req.body);

        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal error' });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const result = await AuthService.verifyOTP(email, otp);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal error' });
    }
}

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const result = await AuthService.resendOTP(email);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal error' });
    }
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
    verifyOTP,
    resendOTP
}

