import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import Switch from "react-switch";

const Modal = () => {
    const [isDone, setIsDone] = useState(false)
    const [form, setForm] = useState({
        name:"biswajit",
        date:""
    })
    const handleToggle = () => {
        setIsDone(!isDone)
    }
    const handleChange = (e) => {

        e.preventDefault();
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(form);
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* modal content write here */}
                            <form className='flex flex-col gap-y-5 text-xl' onSubmit={handleSubmit}>
                                <label className='flex flex-col'>Task Name:
                                    <input type="text" name="name" id="name" className='bg-gray-200 rounded-md focus:outline-none  px-2 py-2 ' placeholder='Enter Task' value={form.name} onChange={handleChange} required />
                                </label>
                                <label htmlFor="date" className='flex flex-col'>Task Date:
                                    <input type="date" name="date" id="date" className='bg-gray-200 rounded-md focus:outline-none  px-1 py-2' value={form.date} onChange={handleChange} />
                                </label>
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
                                <button type="submit">sub</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className='border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white py-2 px-4 rounded-lg' data-dismiss="modal">Close</button>
                            <button type="button" className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-2 rounded-lg'>Add Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className='border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white py-2 px-4 rounded-lg' data-dismiss="modal">Close</button>
                            <button type="button" className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-2 rounded-lg'>Edit Notes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal