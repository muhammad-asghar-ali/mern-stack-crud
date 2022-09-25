const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grades: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)