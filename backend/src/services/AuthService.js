const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const { sendMail } = require('../utils/mailer');
const PasswordResetToken = require('../models/passwordResetToken');
const crypto = require('crypto');
const OtpModel = require('../models/OtpModel');


const loginUser = async (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, userName, email, password, phone, role } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            if (checkUser.provider === "google") {
                resolve({
                    status: 'OK',
                    message: 'This account can only be signed in with Google'
                });
            }

            // Kiểm tra user đã xác minh email chưa
            if (!checkUser.isVerified) {
                resolve({
                    status: 'OK',
                    message: 'Please verify your email before logging in'
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user incorrect'
                })
            }

            // Access token
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.role,
            })

            // Refresh token
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.role,
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
                user: {
                    _id: checkUser.id,
                    firstName: checkUser.firstName,
                    lastName: checkUser.lastName,
                    userName: checkUser.userName,
                    email: checkUser.email,
                    address: checkUser.address,
                    phone: checkUser.phone,
                    role: checkUser.role
                }
            })

        } catch (error) {
            reject(error)
        }
    })
}

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (userRegister) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, email, password, confirmPassword } = userRegister;
        try {
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                return reject({ status: 400, message: 'All fields are required' });
            }

            if (password !== confirmPassword) {
                return reject({ status: 400, message: 'Password and confirm password do not match' });
            }

            if (password.length < 6) {
                return reject({ status: 400, message: 'Password must be at least 6 characters long' });
            }

            const checkEmail = await User.findOne({ email });
            if (checkEmail) return reject({ status: 400, message: 'Email already taken' });

            // Hash password
            const hashedPassword = bcrypt.hashSync(password, 10);

            const otp = generateOTP();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

            // Lưu user chưa xác minh
            const user = new User({
                firstName,
                lastName,
                email,
                userName: email.split('@')[0],
                password: hashedPassword,
                isVerified: false
            });
            await user.save();

            // Lưu OTP
            await OtpModel.create({ email, otp, expiresAt });

            await sendMail({
                to: email,
                subject: "Confirm account TBN Store",
                text: `Your verification OTP code is: ${otp}. This code will expire in 5 minutes.`,
            })

            resolve({ status: 200, message: 'Register successfully! Please check your email to enter the OTP code' });
        } catch (error) {
            console.error(error);
            reject({ status: 500, message: 'Server error' });
        }
    });
};

const verifyOTP = async (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm OTP trong database
            const otpRecord = await OtpModel.findOne({ email, otp });

            if (!otpRecord) {
                return reject({ status: 400, message: 'Invalid OTP code' });
            }

            // Kiểm tra OTP có hết hạn chưa
            if (new Date() > otpRecord.expiresAt) {
                await OtpModel.deleteOne({ email, otp });
                return reject({ status: 400, message: 'OTP code has expired' });
            }

            // Cập nhật user thành đã xác minh
            await User.findOneAndUpdate({ email }, { isVerified: true });

            // Xóa OTP đã sử dụng
            await OtpModel.deleteOne({ email, otp });

            resolve({ status: 200, message: 'Email verified successfully!' });
        } catch (error) {
            console.error(error);
            reject({ status: 500, message: 'Server error' });
        }
    });
};

const resendOTP = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra user có tồn tại không
            const user = await User.findOne({ email });
            if (!user) {
                return reject({ status: 400, message: 'User not found' });
            }
            if (user.isVerified) {
                return reject({ status: 400, message: 'Email already verified' });
            } else {

            }
            // Xóa OTP cũ nếu có
            await OtpModel.deleteMany({ email });

            // Tạo OTP mới
            const otp = generateOTP();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

            // Lưu OTP mới
            await OtpModel.create({ email, otp, expiresAt });

            // Gửi OTP mới
            await transporter.sendMail({
                from: `"TBN Store" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Resend OTP - TBN Store",
                text: `Your new verification OTP code is: ${otp}. This code will expire in 5 minutes.`,
            });

            return resolve({ status: 200, message: 'OTP resent successfully! Please check your email.' });


        } catch (error) {
            console.error(error);
            reject({ status: 500, message: 'Server error' });
        }
    });
};

const forgotPassword = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return reject({ status: 404, message: 'Email not found' });

            const token = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            await PasswordResetToken.deleteMany({ email }); // Xóa token cũ
            await PasswordResetToken.create({ email, token, expiresAt });


            const resetLink = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`

            await sendMail({
                to: email,
                subject: 'Reset password OTP - TBN store',
                html: `
        <div style="font-family: Arial, sans-serif;">
            <h2>Reset your password</h2>
            <p>We received a request to reset your password for your TBN Store account.</p>
            <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;text-decoration:none;border-radius:5px;">Click here to reset your password</a></p>
            <p>If the button above does not work, copy and paste this link into your browser:</p>
            <p style="word-break:break-all;">${resetLink}</p>
            <p>This link will expire in 15 minutes.</p>
            <hr/>
            <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        </div>
    `
            })

            resolve({ status: 200, message: 'Password reset link sent to your email' })
        } catch (error) {
            reject({ status: 500, message: 'Server error' })
        }
    })
}

const resetPassword = async (token, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm token hợp lệ
            const resetTokenDoc = await PasswordResetToken.findOne({ token });
            if (!resetTokenDoc) {
                return reject({ status: 400, message: 'Invalid or expired token' });
            }
            if (new Date() > resetTokenDoc.expiresAt) {
                await PasswordResetToken.deleteOne({ token });
                return reject({ status: 400, message: 'Token has expired' });
            }
            // Tìm user
            const user = await User.findOne({ email: resetTokenDoc.email });
            if (!user) {
                return reject({ status: 404, message: 'User not found' });
            }
            // Đổi mật khẩu
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            // Xóa token sau khi dùng
            await PasswordResetToken.deleteOne({ token });
            resolve({ status: 200, message: 'Password has been reset successfully' });
        } catch (error) {
            reject({ status: 500, message: 'Server error' });
        }
    });
};

const generateGoogleToken = async (user) => {
    console.log('id: ', user)
    return await generalAccessToken({
        id: user._id,
        isAdmin: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName
    });
};

const generateGoogleRefreshToken = async (user) => {
    return await generalRefreshToken({
        id: user._id,
        isAdmin: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName
    });
};


module.exports = {
    loginUser,
    registerUser,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    generateGoogleToken,
    generateGoogleRefreshToken,
};
