const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const PasswordEncryption = require('../middleware/encryption')
const sendGmail = require('../middleware/mailer')


const registerUser = async (req, res) => {
    try {
        let { fName, lName, email, password } = req.body;
        const userHashPassword = await PasswordEncryption(password);  // Assuming this is a bcrypt function
        const userData = {
            fName,
            lName,
            email,
            password: userHashPassword  // Use hashed password here
        };
        const userSaved = await User.create(userData);
        res.status(200).json({
            status: 200,
            message: "Registration Completed!"
        });

    } catch (error) {
        // Error handling
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.send({
                status: 404,
                message: "User email not found"
            })
        }

        const validate = await bcrypt.compare(password, user.password)
        const currentUser = {
            firstName: user.fName,
            lastName: user.lName,
            email: user.email
        }
        const token = await jwt.sign(currentUser, process.env.SECRET_KEY)


        if (validate) {
            return res.send({
                status: 404,
                message: "Login Successfully!",
                token,
                currentUser
            })
        }
        else {
            return res.send({
                status: 404,
                message: "Incorrect Password"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const forgotPassword = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userData = await User.findOne({ email: userEmail })
        if (!userData) {
            return res.send({
                status: 404,
                message: "User not found"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 1000).toString();
        userData.otp = otp;
        await userData.save()
        const to = userEmail;
        const subject = 'Reset Password Request'
        const text = `For reset password you otp is ${otp}`
        const mailsend = await sendGmail(to, subject, text);
        if (mailsend) {
            return res.send({
                status: 200,
                message: "OTP send to your email"
            })
        }
    } catch (error) {
        console.log(error)

    }
}
const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const userData = await User.findOne({ email: email });
        if (otp === userData.otp) {
            return res.send({
                status: 200,
                message: "OTP verified"
            })
        }
        else {
            return res.send({
                status: 400,
                message: "Incorrect OTP"
            })

        }
    } catch (error) {
        console.log(error)

    }
}
const resetPassword = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userData = await User.findOne({ email: email })
        if (!userData) {
            return res.send({
                status: 404,
                message: "User not found"
            })
        }
        const userHashPassword = await PasswordEncryption(password);
        userData.password = userHashPassword;
        await userData.save();
        return res.send({
            status: 200,
            message: "Password reset Successfully"
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    verifyOtp
}