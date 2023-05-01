import React from 'react'
import { FaUser } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.clear();
        window.location.reload()
    }
    return (
        <div className='flex justify-between'>
            <p className='text-xl font-bold md:text-2xl '>
                Task<span className='text-gray-400'>Manager</span>
            </p>

            {/* profile section */}
            <div className='flex items-center gap-1'>
                <FaUser />
                Biswajit
                <TbLogout
                    style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "10px", cursor:"pointer" }}
                    onClick={handleLogout} />
            </div>
        </div>
    )
}

export default Topbar