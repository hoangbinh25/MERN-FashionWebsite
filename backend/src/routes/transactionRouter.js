const express = require('express');
const router = express.Router();
const { proxyGetTransactions } = require('../controllers/transactionController');

router.get('/proxy', proxyGetTransactions);

module.exports = router;
