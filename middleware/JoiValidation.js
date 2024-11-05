const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const passwordComplexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
};
const registerSchema = Joi.object({
    fName: Joi.string().min(3).max(30).required().label('First Name'),
    lName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: PasswordComplexity(passwordComplexityOptions).required().label('Password'),
    otp: Joi.string().optional().label('OTP'),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')

})
const forgotSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
})
const verifyOtpSchema = Joi.object({
    otp: Joi.string().required().label('OTP'),
    email: Joi.string().email().required().label('Email'),
})
const resetPasswordSchema = Joi.object({
    password: Joi.string().required().label('Email'),
    email: Joi.string().email().required().label('Email'),
})

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

module.exports = {
    validateRequest,
    registerSchema,
    loginSchema,
    forgotSchema,
    verifyOtpSchema,
    resetPasswordSchema
};
