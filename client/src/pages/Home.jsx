import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Card from '../components/Card'

const Home = () => {

  return (
    <div className='p-3 pr-5 box-border'>
      {/* topbar */}
      <Topbar/>
      <div className='pt-3 border-t-2 border-gray-200 flex md:justify-center md:flex-wrap flex-col md:flex-row  gap-5'>
        <Card/>        
        <Card />
        <Card />
        <Card />
        <Card />

      
      </div>
    </div>
  )
}

export default Home