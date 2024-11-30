import React, { useState } from 'react'
import "./waitModel.scss"
import { Close } from '@mui/icons-material'
import { AddOptionsNode } from '../../ReactFlowActions'

const WaitModel = ({setNodes,setEdges,id,setWaitModel}) => {

const [formData,setFormData]=useState({
  days:0,
  hours:0,
  seconds:0
})

function onChange(e){
    setFormData((prevformData)=>{
return {...prevformData,[e.target.name]:e.target.value}
    })
}

function handleSubmit(e){
  const sec = (formData.days*86400)+(formData.hours*3600)+(formData.seconds)
e.preventDefault()
AddOptionsNode(setNodes,setEdges,id,sec,"wait")
setWaitModel(false)
}

  return (
    <form className='waitModel' onSubmit={handleSubmit}> 
    <div className="close" onClick={()=>setWaitModel(false)}>
<Close/>
    </div>
    <div className="wrapper">
    <div className="container">
<div className="label">Days</div>
<input className='input' name='days' onChange={(e)=>onChange(e)} placeholder='00' min={0} type="number" />
      </div>
      <div className="container">
      <div className="label">Hours</div>
      <input className='input' name="hours" onChange={(e)=>onChange(e)}  min={0} max={23} placeholder='00' type="number" />
      </div>
      <div className="container">
      <div className="label">Minutes</div>
      <input className='input' name='minutes' onChange={(e)=>onChange(e)}  min={0} max={59} placeholder='00' type="number" />
      </div>
      <div className="container">
      <div className="label">Seconds</div>
      <input className='input' name='seconds' onChange={(e)=>onChange(e)}  min={0} max={59} placeholder='00' type="number" />
      </div>
        </div> 
        <button type='submit' className='btn'>Add</button>   
    </form>
  )
}

export default WaitModel
