import { StudentsContext } from "../context/StudentContext"
import { useContext } from "react"

export const useStudentContext = () => {
  const context = useContext(StudentsContext)

  if(!context) {
    throw Error('StudentsContext must be used inside a StudentsContextProvider')
  }

  return context
}
