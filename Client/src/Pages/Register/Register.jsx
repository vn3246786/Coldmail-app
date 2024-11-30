import React, { useContext, useState } from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'
import { register } from '../../apiCalls'
import { toast } from 'react-toastify'
import { UserContext } from '../../Contexts/UserContext/UserContext'
import { CircularProgress } from '@mui/material'

const Register = () => {

const [formData,setFormData]=useState(null)
const [confirmPass,setConfirmPass]=useState(null)

const {UserDispatch,UserLoading}=useContext(UserContext)

function onChange(e){
  if(e.target.name==="confirmPass"){
setConfirmPass(e.target.value)
  }else{
    setFormData((preData=>{
      return {...preData,[e.target.name]:e.target.value}
    }))
  }
}

    function onSubmit(e){
e.preventDefault()
if(formData.password===confirmPass){
  register(UserDispatch,formData)
}else {
  toast.error("password does not match")
}
    }

  return (
    <div className='register'>
      {UserLoading&&<CircularProgress className='spinner' size={70}/>}
        <div className="container">
            <h1 className='title'>Register</h1>
        <form className="form"  onSubmit={onSubmit}>
       <input placeholder='username' name='username' onChange={(e)=>onChange(e)} className='input' type="text" />
       <input placeholder='organisation name' name='organisation'onChange={(e)=>onChange(e)} className='input' type="text" />
       <input placeholder='email' name='email'onChange={(e)=>onChange(e)} className='input' type="text" />
       <input placeholder='password' name='password' className='input'onChange={(e)=>onChange(e)} type="password" />
       <input placeholder='confirm password'name='confirmPass' onChange={(e)=>onChange(e)} className='input' type="password" />
       <button className="btn"  type='submit'>Register</button>
      </form>
        <Link to={"/login"} className='link'>Login</Link>
      </div>
        </div> 
  )
}

export default Register