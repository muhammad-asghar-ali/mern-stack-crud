import axios from 'axios'
import React from 'react'
import { useStudentContext } from "../hooks/useStudentContext"
import { Link } from 'react-router-dom'
import { useState } from 'react'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StudentList = ({ student }) => {
  const { dispatch } = useStudentContext()
  
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete('http://localhost:3002/api/students/' + student._id)
      const data = await response.data
      dispatch({ type: 'DELETE_STUDENT', payload: data })
    } catch (err) {
      console.log(err)
    }
  }


return (
    <div className="student-details">
      <h4>{student.name}</h4>
      <p><strong>Grades : </strong>{student.grades}%</p>
      <p><strong>School: </strong>{student.school}</p>
      <p>{formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}>delete</span>
      <Link to={`/update/${student._id}`}>
        <div>Edit</div>
      </Link>
    </div>
  )
}
export default StudentList