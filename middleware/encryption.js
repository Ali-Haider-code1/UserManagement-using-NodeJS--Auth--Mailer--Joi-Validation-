
const bcrypt = require('bcrypt');
const PasswordEncryption = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('----', hashedPassword)
    return hashedPassword;
}

module.exports = PasswordEncryption;