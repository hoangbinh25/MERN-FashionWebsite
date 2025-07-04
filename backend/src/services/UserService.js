const User = require('../models/User');
const bcrypt = require('bcrypt')

const UserService = {
    // Get all user
    getAllUser: async () => {
        return await User.find()
    },

    // Get user by id
    getUserById: async () => {
        return await User.findById()
    },

    // Create user
    createUser: async (newUser) => {
        return new Promise(async (resolve, reject) => {
            const { firstName, lastName, userName, email, password, phone } = newUser
            try {
                const checkUser = await User.findOne({
                    email: email
                })

                if (checkUser !== null) {
                    resolve({
                        status: 'OK',
                        message: 'The email is already'
                    })
                    return
                }
                const hash = bcrypt.hashSync(password, 10)

                const createdUser = User.create({
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: hash,
                    phone
                })
                if (createdUser) {
                    resolve({
                        status: "OK",
                        message: "Success",
                        data: createdUser
                    })
                }
            } catch (error) {
                reject(error)
            }

        })
    },

    // Update user
    updateUser: (userId, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: userId
                });
                console.log('checkUser:  ', checkUser);

                const updateUser = await User.findByIdAndUpdate(userId, data, { new: true })
                console.log('update User: ', updateUser)

                resolve({
                    status: "OK",
                    message: "Succress",
                    data: updateUser
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}



module.exports = UserService;
