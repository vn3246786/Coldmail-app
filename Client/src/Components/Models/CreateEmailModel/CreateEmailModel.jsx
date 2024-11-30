import React, { useState } from 'react'
import "./createEmailModel.scss"
import { Close } from '@mui/icons-material'
import { AddOptionsNode } from '../../../ReactFlowActions'


const CreateEmailModel = ({setCreateNewMailModel,id,setNodes,setEdges}) => {

  const [formData,setFormData]=useState(null)

  function onChange(e){
    setFormData((prevFormData)=>{
  return {...prevFormData,[e.target.name]:e.target.value}
    })
  }
    
  function handleSubmit(e){
    e.preventDefault()
    AddOptionsNode(setNodes,setEdges,id,formData,"mail")
    setCreateNewMailModel(false)
      }


  return (
    <form className='createEmailModel' onSubmit={handleSubmit}>
        <div className="title">
      <h1>CREATE TEMPLATE</h1>
      <div className="icon" onClick={()=>setCreateNewMailModel(false)}>
<Close className='icon'/>
      </div>
        </div>
      <input className='input' required={true} onChange={(e)=>onChange(e)} type="text" name='subject' placeholder='SUBJECT' />
      <textarea required={true} onChange={(e)=>onChange(e)} className='textarea'  name="compose" placeholder='COMPOSE MAIL' id=""/>
    <button type='submit' className='btn'>Save And Add</button>
    </form>
  )
}

export default CreateEmailModel
