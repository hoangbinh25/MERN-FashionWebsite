const AuthService = require('../services/AuthService');
const JwtService = require('../services/JwtService')
const passport = require('../config/googlePassport');

const login = async (req, res) => {
    if (req.query.error === 'oauth') {
        return res.status(401).json({ error: 'Google OAuth failed. Please try again' });
    }
    res.status(200).json({ message: 'Login endpoint. Use /auth/google for Google OAuth.' });
}

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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const result = await AuthService.forgotPassword(email);
        return res.status(200).json({ message: result.message })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }
        const result = await AuthService.resetPassword(token, newPassword);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal error' });
    }
}

const googleAuth = (req, res) => {
    try {
        return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    } catch (error) {
        return res.status(500).json({ message: 'Google Auth error', error: error.message });
    }
};

const googleCallback = (req, res) => {
    try {
        passport.authenticate('google', { failureRedirect: '/auth/login', session: false }, async (err, user) => {
            if (err || !user) {
                // console.error('Error in Google Callback:', err);
                return res.redirect('/auth/login?error=oauth');
            }
            if (!user) {
                // console.error('User not found in Google Callback');
                return res.redirect('/auth/login?error=oauth');
            }

            try {
                const access_token = await AuthService.generateGoogleToken(user);
                const refresh_token = await AuthService.generateGoogleRefreshToken(user);
                const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
                res.redirect(`${frontendUrl}/auth/login?access_token=${access_token}&refresh_token=${refresh_token}`);
            } catch (e) {
                res.redirect('/auth/login?error=server');
            }
        })(req, res);
    } catch (error) {
        return res.status(500).json({ message: 'Google Callback error', error: error.message });
    }
};

module.exports = {
    login,
    loginUser,
    registerUser,
    refreshToken,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    googleAuth,
    googleCallback
}

