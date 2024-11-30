import React from 'react'
import "./editOrDeleteNode.scss"
import { Close, DeleteForever, Edit } from '@mui/icons-material'
import { deleleHorrizontalNode, deleleVerticalNode } from '../../../ReactFlowActions'

const EditOrDeleteNode = ({setEditOptionModel,setOptionsModel,setCreateSourceModel, editOptionModel, id, setNodes, setEdges}) => {

function handleClick(){
    if(editOptionModel.type==="LeadSource"){
      setCreateSourceModel(true)
        setEditOptionModel({visible:false,type:null})
    }else if(editOptionModel.type==="AddNode"){
        setOptionsModel(true)
        setEditOptionModel({visible:false,type:null})
    }else return
}

function deleteNode(){
    editOptionModel.type==="LeadSource" && deleleHorrizontalNode(id,setNodes,setEdges)
    editOptionModel.type==="AddNode" && deleleVerticalNode(setNodes,setEdges,id)
    setEditOptionModel({visible:false,type:null})
}

  return (
    <div className='editOrDeleteNode'>
        <div className="close-icon" onClick={()=>setEditOptionModel({visible:false,type:null})}>
        <Close/>
        </div>
        <div className="container">
      <button className="btn">
      <div className="edit-icon" onClick={()=>handleClick()}>
      <Edit/>
        </div>
      <div className="label">Edit</div>
        </button>
        <button className="btn">
            <div className="delete-icon" onClick={()=>deleteNode()}>
            <DeleteForever/>
            </div>
      <div className="label">Delete</div>
        </button>
        </div>
    </div>
  )
}

export default EditOrDeleteNode
