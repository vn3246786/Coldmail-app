import React from 'react'
import "./errorPage.scss"
import { SignalWifiOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate =useNavigate()

  return (
    <div className='errorPage'>
      <div className="container">
      <SignalWifiOff className='icon'/>
      <button className="btn" onClick={()=>navigate(0)}>Reload</button>
      </div>
    </div>
  )
}

export default ErrorPage
