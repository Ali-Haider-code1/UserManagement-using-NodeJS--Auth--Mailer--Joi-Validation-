const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')
const { validateRequest,
    registerSchema,
    loginSchema,
    forgotSchema,
    verifyOtpSchema,
    resetPasswordSchema } = require('../middleware/JoiValidation');

router.post('/register', validateRequest(registerSchema), userController.registerUser);
router.post('/login', validateRequest(loginSchema), userController.loginUser)
router.post('/forgot-password', validateRequest(forgotSchema), userController.forgotPassword)
router.post('/verify-otp', validateRequest(verifyOtpSchema), userController.verifyOtp)
router.post('/reset-password', validateRequest(resetPasswordSchema), userController.resetPassword)


module.exports = router;