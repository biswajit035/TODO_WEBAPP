import React, { useState,useRef } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux'
import {  edit, remove } from '../store/taskSlice';
import Modal from 'react-bootstrap/Modal';
import { add } from '../store/taskSlice';


const Card = ({ name, isDone, date, id, pos }) => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.task)
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(isDone)
  const [eForm, setEForm] = useState({
    name: "",
    date: ""
  })

// edit modal function
  const handleDelete = (id) => {
    dispatch(remove(id));
  }
  const handleEdit = (pos) => {
    setEForm({
      name: data[pos].name,
      date: data[pos].date
    })
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleToggle = (id) => {
    setDone(!done)
  }
  const handleChk=async(id)=>{
    const data = {
      isDone: !done
    }
    dispatch(edit({ data, id }))
    setDone(!done);
  }
  const handleEditModal =async(id)=>{
    const data = {
      name: eForm.name,
      date: eForm.date,
      isDone: done
    }
    dispatch(edit({data,id}))
    // dispatch(getTask())
    // handleClose();
  }

  // format the date
  const datem = new Date(date);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const dateString = datem.toLocaleDateString('en-US', options);

  return (
    <div className='flex items-baseline gap-x-7 md:border-2 md:border-gray-100 md:h-fit md:w-60 p-3 md:shadow-lg md:shadow-gray-200'>

      {/* edit modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='flex flex-col gap-y-5 text-xl' >
            <label className='flex flex-col'>Task Name:
              <input type="text" name="name" id="name" className='bg-gray-200 rounded-md focus:outline-none  px-2 py-2 ' placeholder='Enter Task' value={eForm.name} onChange={handleChange} required />
            </label>
            <label htmlFor="date" className='flex flex-col'>Task Date:
              <input type="date" name="date" id="date" className='bg-gray-200 rounded-md focus:outline-none  px-1 py-2' value={eForm.date} onChange={handleChange} required />
            </label>
            <span className='flex text-sm gap-x-2 items-center'>
              Uncompleted
              <Switch onChange={handleToggle} checked={done} onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch" />
              Completed
            </span>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button type="button" className='border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white py-2 px-4 rounded-lg' onClick={handleClose}>Close</button>
          <button type="button" className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-2 rounded-lg' onClick={()=>{handleEditModal(id)}}>Edit Task</button>
        </Modal.Footer>
      </Modal>
      {/* <!--edit Modal end--> */}


      {/* Card holder */}
      <input className='cursor-pointer' checked={done} type="checkbox" name="" id="" onClick={() => {handleChk(id)}} />
      {/* Card  */}
      <div className="flex flex-col">
        {/* first row */}
        <span className='font-semibold text-xl' >
          {
            done ?
              <s>
                {name}
              </s>
              :
              <>{name}</>

          }
        </span>
        {/* second row */}
        <span className='flex justify-between'>
          <span>{dateString}</span>
          {/* <button > */}
          <span className='flex gap-x-3'>
            {/* dleete task */}
            <MdDelete style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => { handleDelete(id) }} />

            {/* edit task */}
            <MdEdit style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => { handleEdit(pos) }}
            />
          </span>
          {/* </button> */}
        </span>
      </div>
    </div >
  )
}

export default Card