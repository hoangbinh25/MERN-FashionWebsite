const UserService = require('../services/UserService');

// [GET] /user
exports.getAllUser = async (req, res) => {
    try {
        const users = await UserService.getAllUser();
        res.json(users)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [POST /user/create
exports.createUser = async (req, res) => {
    try {
        // register user
        const { firstName, lastName, userName, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is required'
            })

        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is email'
            })

        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input password not equal confirm password'
            })
        }

        const newUser = await UserService.createUser(req.body);
        res.json(newUser)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [PUT] /user/update

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The userId is required'
            })
        }
        console.log('userId: ', userId);
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}