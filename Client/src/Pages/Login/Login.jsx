import React, { useContext, useState } from 'react'
import "./login.scss"
import { Link } from 'react-router-dom'
import { login } from '../../apiCalls'
import { UserContext } from '../../Contexts/UserContext/UserContext'
import { CircularProgress } from '@mui/material'

const Login = () => {

  const [formData,setFormData]=useState(null)
  
  const {UserDispatch,UserLoading}=useContext(UserContext)
  
  function onChange(e){
      setFormData((preData=>{
        return {...preData,[e.target.name]:e.target.value}
      }))
  }
  
      function onSubmit(e){
e.preventDefault()
    login(UserDispatch,formData)   
  }
      
  return (
    <div className='login'>
       {UserLoading&&<CircularProgress className='spinner' size={70}/>}
        <div className="container">
            <h1 className='title'>Login</h1>
        <form className="form"  onSubmit={onSubmit}>
       <input placeholder='email' name='email' onChange={(e)=>onChange(e)} className='input' type="text" />
       <input placeholder='password' name='password' onChange={(e)=>onChange(e)} className='input' type="password" />
       <button className="btn"  type='submit'>Login</button>
      </form>
        <Link to={"/register"} className='link'>Register</Link>
      </div>
        </div> 
  )
}

export default Login
