const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '2h' })

    return access_token
}

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })

    return refresh_token
}

const refreshTokenJwt = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err || !user) {
                    resolve({
                        status: 'Error',
                        message: 'Token expired'
                    })
                    return;
                }
                // Nếu token hợp lệ, lấy thông tin user từ token
                const { payload } = user
                // Tạo access_token mới dựa trên thông tin user
                const access_token = await generalAccessToken({
                    id: payload.id,
                    isAdmin: payload.isAdmin
                })
                // Trả về access_token mới cho client
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt
}