const User = require('../models/User');
const bcrypt = require('bcrypt')

// Get all user with filter, sort, pagination, search by name (case-insensitive)
const getUsers = async (filter = {}, sortBy = '', page = 1, limit = 10, searchName = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {};
            if (sortBy === 'createdAt') {
                sortObj = { createdAt: -1 };
            }
            // Thêm điều kiện tìm kiếm theo tên (không phân biệt hoa thường)
            if (searchName && typeof searchName === "string" && searchName.trim() !== "") {
                // Tìm theo firstName hoặc lastName hoặc userName, không phân biệt hoa thường
                filter.$or = [
                    { firstName: { $regex: searchName, $options: "i" } },
                    { lastName: { $regex: searchName, $options: "i" } },
                    { userName: { $regex: searchName, $options: "i" } }
                ];
            }
            // Tính tổng số user
            const totalUsers = await User.countDocuments(filter);
            // Lấy danh sách user theo phân trang, lọc, sắp xếp
            const users = await User.find(filter)
                .sort(sortObj)
                .skip((page - 1) * limit)
                .limit(limit);
            resolve({
                status: 'OK',
                message: 'Success',
                data: users,
                totalUsers,
                pageCurrent: page,
                totalPage: Math.ceil(totalUsers / limit)
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
const updateAddress = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(userId);
            if (!checkUser) {
                return reject({
                    status: 'Error',
                    message: 'User not found'
                });
            }
            
            // Chỉ lưu _id của address vào user
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                { address: data._id }, // Chỉ lưu _id
                { new: true }
            ).populate('address'); // Populate để trả về đầy đủ thông tin address

            resolve({
                status: "OK",
                message: "Address updated successfully",
                data: updatedUser
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateAddress,
};
