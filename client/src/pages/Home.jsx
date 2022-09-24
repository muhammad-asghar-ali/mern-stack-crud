import { useEffect, useState } from "react"
import axios from 'axios'

// components
import StudentList from "../components/StudentList"
import StudentForm from "../components/StudentForm"
import { useStudentContext } from "../hooks/useStudentContext"
const Home = () => {
  // const [students, setStudents] = useState(null)
  const { students, dispatch } = useStudentContext()

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/students')
        const students = await response.data
        dispatch({ type: 'SET_STUDENT', payload: students })
      } catch (err) {
        console.log(Error)
      }
    }

    getStudents()
  }, [dispatch])
  console.log(students)

  return (
    <div className="home">
      <div className="students">
        {students && students.map((student, idx) => (
          <StudentList student={student} key={idx} />
        ))}
      </div>
      <StudentForm />
    </div>
  )
}

export default Home
