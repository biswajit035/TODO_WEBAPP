import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login, STATUSES } from '../store/userSlice';
import { ThreeDots } from 'react-loader-spinner';
import secureLocalStorage from "react-secure-storage";



const Login = () => {
  const { data, status } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const disptach = useDispatch()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await disptach(login(form));
    if (secureLocalStorage.getItem("token")) navigate("/")
  }

  return (
    // main div
    <div className='login border-2 border-red h-full w-full  lg:w-[40vw] md:h-fit md:w-[60vw] p-5 flex flex-col items-center shadow-2xl'>
      <h1 className='text-3xl pt-20 font-bold py-16 lg:py-10'>Sign in to Continue</h1>

      {/* form */}
      <form className='text-2xl flex flex-col' onSubmit={handleSubmit}>
        {/* email */}
        <label htmlFor="email" className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Email:</label>
        <input
          className="border-2 h-10 rounded-3xl p-3 mb-3 focus:outline-none focus:border-blue-500 focus:invalid:border-red-500 "
          autoComplete="off"
          type="email"
          id='email'
          name='email'
          placeholder='Enter your email'
          value={form.email}
          onChange={(e) => { handleChange(e) }} required
        />

        {/* password */}
        <label htmlFor="password" className="text-xl after:content-['*'] after:ml-0.5 after:text-red-500">Password:</label>
        <input
          className='border-2 h-10 rounded-3xl p-3 mb-5 focus:outline-none focus:border-blue-500'
          type="password"
          id='password'
          name='password'
          placeholder='Enter your password'
          minLength={5}
          maxLength={10}
          value={form.password}
          onChange={(e) => { handleChange(e) }} required
        />

        {/* login button */}
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
              "Log in"
          }
        </button>
      </form>

      {/* bottom redirect link */}
      <span className='mt-5'>Didn't have an account <Link to='signup' className='text-blue-500'>click here</Link></span>
    </div>
  )
}

export default Login