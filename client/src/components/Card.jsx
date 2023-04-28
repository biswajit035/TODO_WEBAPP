import React, { useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';


const Card = () => {

  const [done, setDone] = useState(false);

  return (
    <div className='flex items-baseline gap-x-7 md:border-2 md:border-gray-100 md:h-fit md:w-60 p-3 md:shadow-lg md:shadow-gray-200'>
      <input className='cursor-pointer' type="checkbox" name="" id="" onClick={() => {
        setDone(!done);
      }} />
      <div className="flex flex-col">
        {/* first row */}
        <span className='font-semibold text-xl'>
          {
            done ?
              <s>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </s>
              :
              <>Lor amet consectetur adipisicing elit.</>

          }
        </span>

        {/* second row */}
        <span className='flex justify-between'>
          <span>Mon, Apr 30</span>
          {/* <button > */}
          <span className='flex gap-x-3'>
            <MdDelete style={{ fontSize: "20px", cursor: "pointer" }} />
            <MdEdit style={{ fontSize: "20px", cursor: "pointer" }} />
          </span>
          {/* </button> */}
        </span>
      </div>
    </div>
  )
}

export default Card