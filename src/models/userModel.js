const mongoose = require('mongoose')

const userDatabase = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number
    },
    refreshToken: {
        type: String
    }
},)

userDatabase.index({ email: 1 })

const collection = mongoose.model('user', userDatabase)


module.exports = collection