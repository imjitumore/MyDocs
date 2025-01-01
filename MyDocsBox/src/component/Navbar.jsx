import React from 'react'
import logo from "/mydocs.png"
import { CiSearch,CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
        <div className='py-1 flex justify-between bg-white items-center sm:px-10 px-4 shadow-md sticky top-0'>
            <ul >
                <li><Link to={"/"}><img className='sm:h-12 h-10' src={logo} alt="" /></Link></li>
            </ul>
            <ul className='flex text-xl gap-10 sm:pr-10 pr-4'>
                <li className='cursor-pointer '><CiSearch/></li>
                <li className='cursor-pointer'><Link to={"/dashboard"}><CiUser/></Link></li>
            </ul>
        </div>
    </>
  )
}
