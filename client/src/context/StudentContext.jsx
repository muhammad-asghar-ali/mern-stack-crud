import { createContext, useReducer } from 'react'

export const StudentsContext = createContext()

export const studentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENT':
      return {
        students: action.payload
      }
    case 'CREATE_STUDENT':
      return {
        students: [action.payload, ...state.students]
      }
    case 'DELETE_STUDENT':
      return {
        students: state.students.filter(student => student._id !== action.payload._id)
      }

    case 'UPDATE_STUDENT':
      return {
        students: state.students.map(student => {
          if (student._id === action.payload._id) {
            return student
          }
          else{
            return student
          }
        })
      }
    default:
      return state
  }
}

export const StudentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, {
    students: null
  })

  return (
    <StudentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  )
}
