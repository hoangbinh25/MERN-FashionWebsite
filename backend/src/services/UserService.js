const User = require('../models/User');
const bcrypt = require('bcrypt')

// Get all user
const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAll = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: getAll
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Get user by id
const getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUser = await User.findById(userId)
            resolve({
                status: 'OK',
                message: 'Success',
                data: getUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Create user
const createUser = async (newUser) => {
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
}

// Update user
const updateUser = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userId
            });

            const updateUser = await User.findByIdAndUpdate(userId, data, { new: true })

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

// Delete user
const deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userId
            })

            if (!checkUser) {
                resolve({
                    status: 'Error',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(userId)
            resolve({
                status: 'OK',
                message: 'Delete user success'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
