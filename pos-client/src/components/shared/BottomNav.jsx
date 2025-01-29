import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineReorder,MdTableBar  } from "react-icons/md";
const BottomNav = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-between'>
      <button><IoHomeOutline className='inline mr-4' size={15}/>Home</button>
      <button><MdOutlineReorder className='inline mr-4' size={15}/>Orders</button>
      <button><MdTableBar className='inline mr-4' size={15}/>Tables</button>
      <button><CiCircleMore className='inline mr-4' size={15}/>More</button>
    </div>
  )
}

export default BottomNav
