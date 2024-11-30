import React from 'react'
import "./nodeOptionsModel.scss"
import { Close, HourglassTop, Mail } from '@mui/icons-material'

const NodeOptionsModel = ({setOptionsModel,id,setCreateNewMailModel,setWaitModel,nodes}) => {

function isWaitVisible(){
  let value = false
nodes.map((node,i)=>{
  if(Number(node.id)===Number(id)-1){
node.data.label==="mail"&& (value=true)
  }else return 
})
return value
}

function handleClick(type){
  if(type==="mail"){
    setCreateNewMailModel(true)
  }else {
setWaitModel(true)
  }
    setOptionsModel(false)
}
  return (
    <div className='nodeOptionsModel'>
        <div className="title">
            <h1>OPTIONS</h1>
            <div className="close-icon" onClick={()=>setOptionsModel(false)}>
            <Close className='close-icon'/>
            </div>
        </div>
        <div className="options-conatainer">
        {!isWaitVisible()&&<div className="icon-container" onClick={()=>handleClick("mail")}>
      <Mail className='mail-icon'/>
      <h2>MAIL</h2>
        </div>}
       {Number(id)>1 &&isWaitVisible()&& <div className="icon-container" onClick={()=>handleClick("wait")}>
      <HourglassTop className='wait-icon'/>
      <h2>WAIT</h2>
        </div>}
            </div>
    </div>
  )
}

export default NodeOptionsModel
