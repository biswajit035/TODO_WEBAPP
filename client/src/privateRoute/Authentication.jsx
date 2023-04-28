import React from 'react'
import { Navigate } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage";


const Authentication = ({children}) => {
  const local = secureLocalStorage.getItem("token")
  return (
    local ? children : <Navigate to='/auth'/>
  )
}

export default Authentication