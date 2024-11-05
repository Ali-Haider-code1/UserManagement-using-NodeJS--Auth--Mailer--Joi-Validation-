

const mongoose = require('mongoose');
const mongoDbUrl = 'mongodb://localhost:27017/users'
const Connection = async () => {
    const connect = await mongoose.connect(mongoDbUrl)

    if (connect) {
        console.log('Database connected')
    }
    else {
        console.log('Error occured during database connectivity')
    }
}

module.exports = {
    Connection
};