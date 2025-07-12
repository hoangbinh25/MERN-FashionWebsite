const express = require('express');
const router = express.Router();
const { askFashionBot } = require('../controllers/chatController');

router.post('/ask', askFashionBot);

module.exports = router;