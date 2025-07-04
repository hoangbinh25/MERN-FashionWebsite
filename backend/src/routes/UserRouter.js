const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

router.put('/update/:id', UserController.updateUser)
router.post('/create', UserController.createUser);
router.get('/', UserController.getAllUser);


module.exports = router
