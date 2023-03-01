const mongoose = require('mongoose')
const usermodel = require('./src/models/userModel')
const bcrypt = require("bcrypt")
const uri = process.env.DEVDATABASE 
console.log(uri);
module.exports = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("Database connected!")

    })
    .catch(err => console.log(err));