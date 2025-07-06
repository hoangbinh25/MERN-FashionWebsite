const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers.token;
    if (!bearerToken) {
        return res.status(401).json({
            status: 'Error',
            message: 'No token'
        })
    }
    const token = req.headers.token.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, function (error, user) {
        if (error) {
            return res.status(401).json({
                status: 'Error',
                message: 'The authentication'
            })
        }
        const { payload } = user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(403).json({
                status: 'Error',
                message: 'Not allowed'
            })
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const bearerToken = req.headers.token;
    if (!bearerToken) {
        return res.status(401).json({
            status: 'Error',
            message: 'No token'
        })
    }
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (error, user) {
        if (error) {
            return res.status(401).json({
                status: 'Error',
                message: 'The authentication'
            })
        }
        const { payload } = user
        if (payload?.isAdmin || payload?.id == userId) {
            next()
        } else {
            return res.status(403).json({
                status: 'Error',
                message: 'Not allowed'
            })
        }
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}