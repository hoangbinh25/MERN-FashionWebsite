const express = require('express')
const router = express.Router();

const ContactController = require('../controllers/ContactController');

router.post('/send-mail', ContactController.sendMailToAdmins);

module.exports = router