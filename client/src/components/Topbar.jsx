import React from 'react'
import { FaUser } from 'react-icons/fa';

const Topbar = () => {
    return (
        <div className='flex justify-between'>
            <span className='text-xl md:text-2xl font-bold'>
                Task<span className='text-gray-400'>Manager</span>
            </span>
            
            {/* profile section */}
            <div className='flex items-center gap-1'>
                <FaUser />
                Biswajit
            </div>
        </div>
    )
}

export default Topbar