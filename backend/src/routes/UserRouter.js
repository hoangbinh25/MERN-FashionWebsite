const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.get('/getUsers', authMiddleware, UserController.getUsers);
router.get('/getUser/:id', authUserMiddleware, UserController.getUserById)
router.post('/create', UserController.createUser);
router.put('/update/:id', UserController.updateUser)
router.delete('/delete/:id', authMiddleware, UserController.deleteUser)

module.exports = router
