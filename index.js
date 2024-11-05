
const express = require('express');
const { Connection } = require('./models/connection')
require('dotenv').config();
const PORT = 3001;

const app = express();
app.use(express.json());

// DataBase connection function
Connection();

// Routes Declaration
const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


