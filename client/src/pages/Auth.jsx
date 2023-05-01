import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='grid h-screen place-items-center'>
      <Outlet/>
      </div>
  )
}

export default Auth