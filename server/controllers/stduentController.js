const StudentModel = require('../models/StudentModel')
const mongoose = require('mongoose')

module.exports.getAllStudents = async(req, res, next) => {
    try {
        const students = await StudentModel.find({}).sort({ createdAt: -1 })

        if (!students.length) {
            return res.status(404).json({ message: "No Student in a database" })
        }

        res.status(200).json(students)

    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports.createStudent = async(req, res, next) => {
    try {
        const { name, grades, school } = req.body

        // if (!name || !grade || !school) {
        //     res.status(400).json({ message: "All fields are required" })
        // }
        let emptyFields = []

        if (!name) {
            emptyFields.push('name')
        }
        if (!grades) {
            emptyFields.push('grades')
        }
        if (!school) {
            emptyFields.push('school')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ message: 'Please fill in all fields', emptyFields })
        }

        const studentModel = {
            name,
            grades,
            school
        }

        const newStduent = await StudentModel.create(studentModel)

        res.status(200).json(newStduent)


    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports.getOneStudent = async(req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(404).json({ message: "student id is not found" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'No such Student' })
        }

        const student = await StudentModel.findById({ _id: id })

        if (!student) {
            return res.status(404).json({ message: "student not found" })
        }

        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports.updateStudent = async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, grades, school } = req.body

        if (!id) {
            return res.status(404).json({ message: "Student id is not found" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'No such Student' })
        }

        const student = await StudentModel.findByIdAndUpdate(id, {...req.body }, { new: true })
        if (!student) {
            return res.status(400).json({ message: 'No such Student' })
        }

        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports.deleteStudent = async(req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(404).json({ message: "Student id is not found" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'No such Student' })
        }

        const student = await StudentModel.findByIdAndDelete({ _id: id })
        if (!student) {
            return res.status(400).json({ message: 'No such Student' })
        }
        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}