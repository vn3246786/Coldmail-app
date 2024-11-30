import React, { useContext } from 'react'
import "./sidebar.scss"
import {  Home, Info, Logout } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext/UserContext'

const Sidebar = () => {

const url = useLocation()
const navigate = useNavigate()
const {UserDispatch} =useContext(UserContext)

function onClick(){
  sessionStorage.removeItem("User")
  UserDispatch({type:"logout"})
}

  return (
    <div className='sidebar'>
        <div onClick={()=>navigate("/")} className="container" style={{backgroundColor:url.pathname==="/"?"yellow":"",
          color:url.pathname==="/"?"gray":""
        }}>
      <Home/>
<div className="label">Home</div>
        </div>
        <div className="container">
      <Info/>
<div className="label">About</div>
        </div>
        <div className="container">
      <Logout/>
      <div className="label" onClick={()=>onClick()}>Logout</div>
        </div>
    </div>
  )
}

export default Sidebar
