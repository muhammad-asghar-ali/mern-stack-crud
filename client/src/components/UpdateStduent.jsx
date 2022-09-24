import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useStudentContext } from "../hooks/useStudentContext"

const UpdateStduent = () => {
    const [name, setName] = useState('')
    const [grades, setGrades] = useState('')
    const [school, setSchool] = useState('')
    const { dispatch } = useStudentContext()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const getStudentDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/students/' + params.id)
                const data = await response.data
                setName(data.name)
                setGrades(data.grades)
                setSchool(data.school)
            } catch (err) {
                console.log(err)
            }
        }
        getStudentDetails()
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const student = { name, grades, school }
            const response = await axios.put('http://localhost:3002/api/students/'+ params.id, student)
            console.log(response)
            const updateData = await response.data
            if (updateData) {
                console.log(updateData)
                navigate('/')
                // setName(updateData.name)
                // setGrades(updateData.grades)
                // setSchool(updateData.school)
                dispatch({ type: 'UPDATE_STUDENT', payload: updateData })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form className="update" onSubmit={handleSubmit}>
                <h3>Update Student</h3>

                <label>Student Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label>Grades %:</label>
                <input
                    type="number"
                    onChange={(e) => setGrades(e.target.value)}
                    value={grades}
                />

                <label>School:</label>
                <input
                    type="text"
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                />

                <button>Update Student</button>
            </form>
        </div>
    )
}

export default UpdateStduent