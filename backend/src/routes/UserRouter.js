const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.get('/getUsers', authMiddleware, UserController.getUsers);
router.get('/getUser/:id', authUserMiddleware, UserController.getUserById)
router.post('/create', authMiddleware, UserController.createUser);

// Update Profile
router.put('/profile/:id', authUserMiddleware, UserController.updateUser)

// Delete
router.delete('/delete/:id', authMiddleware, UserController.deleteUser)

module.exports = router
