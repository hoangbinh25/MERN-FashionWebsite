const express = require('express')
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/resend-otp', AuthController.resendOTP);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleCallback);

router.post('/refresh-token', AuthController.refreshToken);


module.exports = router;
