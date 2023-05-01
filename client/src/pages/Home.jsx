import { STATUSES, getTask, add } from '../store/taskSlice';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Topbar } from '../components/components';
import { RotatingLines } from 'react-loader-spinner';
import { MdOutlineAddCircle } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Switch from "react-switch";

const Home = () => {
  const { data, status } = useSelector((state) => state.task)
  const buttonRef = useRef(null);
  const dispatch = useDispatch()
  const [isDone, setIsDone] = useState(false)
  const [form, setForm] = useState({
    name: "",
    date: ""
  })
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getTask())
    console.log(data);
  }, [])

  // add modal function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //creating object 
    const data = {
      name: form.name,
      date: form.date,
      isDone
    }
    // calling api
    await dispatch(add(data));
    // reset the form
    setForm({
      name: "",
      date: ""
    })
    setIsDone(false)
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleAdd = () => {
    buttonRef.current.click()
    form.name && handleClose();
  }
  const handleToggle = () => {
    setIsDone(!isDone)
  }

  return (
    <div className='p-3 pr-5 box-border'>

      {/* topbar */}
      <Topbar />

      {/* <!-- Modal to add note --> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* modal content write here */}
          <form className='flex flex-col gap-y-5 text-xl' onSubmit={handleSubmit}>

            {/* taskName */}
            <label className='flex flex-col'>Task Name:
              <input type="text" name="name" id="name" className='bg-gray-200 rounded-md focus:outline-none  px-2 py-2 ' placeholder='Enter Task' value={form.name} onChange={handleChange} required />
            </label>

            {/* task date */}
            <label htmlFor="date" className='flex flex-col'>Task Date:
              <input type="date" name="date" id="date" className='bg-gray-200 rounded-md focus:outline-none  px-1 py-2' value={form.date} onChange={handleChange} required />
            </label>

            {/* task status */}
            <span className='flex text-sm gap-x-2 items-center'>
              Uncompleted
              <Switch onChange={handleToggle} checked={isDone} onColor="#86d3ff"
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

            {/* button */}
            <button type="submit" ref={buttonRef} onClick={(e) => handleSubmit()} style={{ display: "none" }}>SBUMIT</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className='border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white py-2 px-4 rounded-lg' onClick={handleClose}>Close</button>
          <button type="button" className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-2 rounded-lg' onClick={() => handleAdd()}>Add Task</button>
        </Modal.Footer>
      </Modal>

      {/* task card holder */}
      <div className='pt-3 border-t-2 border-gray-200 flex md:justify-center md:flex-wrap flex-col md:flex-row  gap-5'>

        {/* add task button */}
        <MdOutlineAddCircle style={{ position: "fixed", right: "15px", bottom: "20px", fontSize: "65px" }} onClick={() => { setShow(true); }} />

        {/* task card */}
        {
          // loader
          status == STATUSES.LOADING ?
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            :
            // card
            (
              !data.length == 0 ?
                data.map((item, idx) => {
                  return (<Card name={item.name} isDone={item.isDone} date={item.date} id={item._id} key={idx} pos={idx} />)
                })
                :
                "No data available"
            )
        }
      </div>
    </div>
  )
}

export default Home