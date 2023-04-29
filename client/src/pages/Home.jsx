import React from 'react'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { MdOutlineAddCircle } from 'react-icons/md';
import Modal from '../components/Modal';


const Home = () => {

  return (
    <div className='p-3 pr-5 box-border'>
      {/* topbar */}
      <Topbar />
      {/* <!-- Modal to add note --> */}
      <Modal/>

      <div className='pt-3 border-t-2 border-gray-200 flex md:justify-center md:flex-wrap flex-col md:flex-row  gap-5'>

        {/* add task button */}
        <button type="button" data-toggle="modal" data-target="#exampleModal">
          <MdOutlineAddCircle style={{ position: "fixed", right: "15px", bottom: "20px", fontSize: "65px" }} />
        </button>

        {/* task card */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />


      </div>
    </div>
  )
}

export default Home