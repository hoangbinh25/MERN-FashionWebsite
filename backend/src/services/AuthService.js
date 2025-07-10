const User = require('../models/User');
const Otp = require('../models/OtpModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const { sendMail } = require('../utils/mailer');


const loginUser = async (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, userName, email, password, phone } = userLogin
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
            await Otp.create({ email, otp, expiresAt });

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
            const otpRecord = await Otp.findOne({ email, otp });

            if (!otpRecord) {
                return reject({ status: 400, message: 'Invalid OTP code' });
            }

            // Kiểm tra OTP có hết hạn chưa
            if (new Date() > otpRecord.expiresAt) {
                await Otp.deleteOne({ email, otp });
                return reject({ status: 400, message: 'OTP code has expired' });
            }

            // Cập nhật user thành đã xác minh
            await User.findOneAndUpdate({ email }, { isVerified: true });

            // Xóa OTP đã sử dụng
            await Otp.deleteOne({ email, otp });

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
            await Otp.deleteMany({ email });

            // Tạo OTP mới
            const otp = generateOTP();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

            // Lưu OTP mới
            await Otp.create({ email, otp, expiresAt });

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

module.exports = {
    loginUser,
    registerUser,
    verifyOTP,
    resendOTP
};
