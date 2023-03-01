const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    date: {
        type: String,
    },
    task: {
        type: String,
    },
    status: {
        type: String
    }
})


const collection = mongoose.model('task', taskSchema)


module.exports = collection