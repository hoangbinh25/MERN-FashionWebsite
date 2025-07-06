const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken, refreshTokenJwt } = require('./JwtService');


const loginUser = async (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, userName, email, password, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user incorrect'
                })
            }

            // Access token
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.role,
            })

            // Refresh token
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.role,
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            })

        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    loginUser
};
