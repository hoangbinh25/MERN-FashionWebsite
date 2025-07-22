const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/reportAll', ReportController.getAllReports);

module.exports = router;
