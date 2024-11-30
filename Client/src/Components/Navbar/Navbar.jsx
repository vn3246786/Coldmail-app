import React from 'react'
import "./navbar.scss"
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

const navigate =useNavigate()
const url = useLocation()

  return (
    <div className='navbar'>
        <h1 className='title'>Coldmail</h1>
        <div className="btns">
      {url.pathname!=="/new-sequence"&&<button onClick={()=>navigate("/new-sequence")} className='btn'>Create new sequence</button>}
        </div>
    </div>
  )
}

export default Navbar
