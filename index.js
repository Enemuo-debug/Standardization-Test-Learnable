const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rootRouter = require('./src/routes/index.routers');
const UserServices = require('./src/services/User.Services');
const UserController = require('./src/controllers/User.Controller');

const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log('Error in Connecting to DataBase');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', rootRouter);
app.use((req, res)=>{
    return res.status(200).json({
        message: 'Welcome to Post-its API',
        success: true,
    })
})