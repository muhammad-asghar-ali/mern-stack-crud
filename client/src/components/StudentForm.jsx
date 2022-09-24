import axios from 'axios'
import { useState } from 'react'
import { useStudentContext } from "../hooks/useStudentContext"

const StudentForm = () => {
  const [name, setName] = useState('')
  const [grades, setGrades] = useState('')
  const [school, setSchool] = useState('')
  const { dispatch } = useStudentContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const stduent = {name, grades, school}    
        const response = await axios.post('http://localhost:3002/api/students', stduent)          
        const formData = await response.data
        setName('')
        setGrades('')
        setSchool('')
        dispatch({type: 'CREATE_STUDENT', payload: formData})
    } catch (err) {
        console.log(err)
    } 
}

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add New Student</h3>

      <label>Student Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        required={true}
      />

      <label>Grades %:</label>
      <input 
        type="number" 
        onChange={(e) => setGrades(e.target.value)} 
        value={grades}
        required={true}
      />

      <label>School:</label>
      <input 
        type="text" 
        onChange={(e) => setSchool(e.target.value)} 
        value={school} 
        required={true}
      />

      <button>Add Student</button>
    </form>
  )
}

export default StudentForm