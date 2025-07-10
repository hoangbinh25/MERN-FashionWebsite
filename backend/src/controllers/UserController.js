const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken')

// [GET] /user/getUsers
const getUsers = async (req, res) => {
    try {
        const user = await UserService.getUsers();
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [GET] /user/getUser/:id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(404).json({
                status: 'Error',
                message: 'userId not found'
            })
        }

        const user = await UserService.getUserById(userId);
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [POST] /user/create
const createUser = async (req, res) => {
    try {
        // Get data from req
        const { firstName, lastName, userName, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        // Check data input
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is required'
            })

            // Check email 
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is email'
            })

            // Check password
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input password not equal confirm password'
            })
        }

        // Create new user
        const newUser = await UserService.createUser(req.body);
        res.json(newUser)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [PUT] /user/profile/:id
const updateUser = async (req, res) => {
    try {
        // Get ID from URL
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(400).json({
                status: 'Error',
                message: 'The userId is not found'
            })
        }

        // Get infor user from token verified
        const token = req.headers.token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const { payload } = decoded;

        if (!payload?.isAdmin) {
            const fieldUpdate = ["firstName", "lastName", "userName", "address", "phone"]
            Object.keys(data).forEach(key => {
                if (!fieldUpdate.includes(key)) {
                    delete data[key];
                }
            })
        }

        const updateUser = await UserService.updateUser(userId, data);

        if (!updateUser) {
            return res.status(404).json({
                status: 'Error',
                message: 'The userId not found'
            })
        }
        return res.status(200).json(updateUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// [DELETE] /user/delete/:id
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(404).json({
                status: 'Error',
                message: 'The userId not found'
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
