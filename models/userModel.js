const { required, number, string } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true  // Should be required for registration
    },
    password: {
        type: String,
        required: true  // Corrected typo
    },
    otp: {
        type: String,

    }
});

const userModel = mongoose.model('UserInformation', userSchema);  // Export this model
module.exports = userModel;  // Ensure you export userModel
