const express = require('express')
const studentController = require('../controllers/stduentController')

const router = express.Router()

router.get('/', studentController.getAllStudents)

router.post('/', studentController.createStudent)

router.get('/:id', studentController.getOneStudent)

router.put('/:id', studentController.updateStudent)

router.delete('/:id', studentController.deleteStudent)

module.exports = router