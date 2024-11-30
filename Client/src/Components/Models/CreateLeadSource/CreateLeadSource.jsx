import React, { useContext, useState } from 'react'
import "./createLeadSource.scss"
import { CloseOutlined } from '@mui/icons-material';
import { AddSourceNode } from '../../../ReactFlowActions';

const CreateLeadSource = ({setCreateSourceModel,id,setNodes,setEdges,nodes}) => {

const [formData,setFormData]=useState(null)


function onChange(e){
  setFormData((prevFormData)=>{
return {...prevFormData,[e.target.name]:e.target.value}
  })
}

  function handleSubmit(e){
e.preventDefault()
AddSourceNode(setNodes,setEdges,id,formData,nodes)
setCreateSourceModel(false)
  }

  return (
    <form onSubmit={handleSubmit} className='createLeadSource'>
        <div className="header">
        <h1>Create Lead Source</h1>
        <div className="close" onClick={()=>setCreateSourceModel(false)}>
       <CloseOutlined/>
        </div>
        </div>
      <div className="field">
        <div className="label">Title</div>
        <input name='title' onChange={(e)=>onChange(e)} required={true} className='input' type="text" placeholder='Title'/>
      </div>
      <div className="field">
        <div className="label">First Name</div>
        <input name='firstName' required={true} onChange={(e)=>onChange(e)} className='input' type="text" placeholder='First Name'/>
      </div>
      <div className="field">
        <div className="label">last Name</div>
        <input name='lastName' required={true} onChange={(e)=>onChange(e)} className='input' type="text" placeholder='Last Name'/>
      </div>
      <div className="field">
        <div className="label">Email</div>
        <input name='email' required={true} onChange={(e)=>onChange(e)} className='input' type="text" placeholder='Email'/>
      </div>
      <button type='submit' className='btn'>Create</button>
    </form>
  )
}

export default CreateLeadSource
