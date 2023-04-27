import React from 'react'
import { Navigate } from 'react-router-dom'

const Authentication = ({children}) => {
    const local = localStorage.getItem('token')

  return (
    !local ? children : <Navigate to='/auth'/>
  )
}

export default Authentication