import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/userSlice';
import { STATUSES } from '../store/userSlice';
import { ThreeDots } from 'react-loader-spinner';
import secureLocalStorage from "react-secure-storage";


const Signup = () => {
  const navigate = useNavigate()
  const { data, status } = useSelector((state) => state.user)
  const disptach = useDispatch()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    await disptach(signup(form));
    if (secureLocalStorage.getItem("token")) navigate("/")
  }
  return (
    // main div
    <div className='signup border-2 border-red h-full w-full  lg:w-[40vw] md:h-fit md:w-[60vw] p-5 flex flex-col items-center shadow-2xl'>
      <h1 className='text-3xl pt-20 font-bold py-10 lg:py-10'>Create an account</h1>
      {/* form */}
      <form action="" className='text-2xl flex flex-col ' onSubmit={handleSubmit}>
        {/* Full Name */}
        <label htmlFor="email" className="text-xl after:content-['*'] after:ml-0.5 after:text-red-500">Full Name:</label>
        <input className='border-2 h-10 rounded-3xl p-5 mb-5 focus:outline-none focus:border-blue-500  ' type="text" id='name' name='name' value={form.name} placeholder='Enter your name' required onChange={(e) => { handleChange(e) }} />
        {/* Email */}
        <label htmlFor="email" className="text-xl after:content-['*'] after:ml-0.5 after:text-red-500">Email:</label>
        <input className='border-2 h-10 rounded-3xl p-5 mb-5 focus:outline-none focus:border-blue-500 focus:invalid:border-red-500 ' autoComplete="off" type="email" id='email' name='email' value={form.email} placeholder='Enter your email' required onChange={(e) => { handleChange(e) }} />
        {/* password */}
        <label htmlFor="password" className="text-xl after:content-['*'] after:ml-0.5 after:text-red-500">Password:</label>
        <input className='border-2 h-10 rounded-3xl p-5 mb-5 focus:outline-none focus:border-blue-500' type="password" id='password' name='password' value={form.password} placeholder='Enter your password' minLength={5} maxLength={10} required onChange={(e) => { handleChange(e) }} />
        {/* signup button */}
        <button type="submit" className='bg-blue-500 text-white px-10 py-2 rounded-full hover:bg-blue-600 flex items-center justify-center'>
          {
            status == STATUSES.LOADING ?
              <ThreeDots
                height="32"
                width="90"
                radius="9"
                color="WHITE"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              :
              "Sign up"
          }
        </button>
      </form>
      <span className='mt-5'>Already have an account <Link to='/auth' className='text-blue-500'>click here</Link></span>
    </div>
  )
}

export default Signup