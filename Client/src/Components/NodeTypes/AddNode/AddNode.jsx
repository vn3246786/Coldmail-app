import React from 'react'
import {Add, HourglassTop, Mail} from '@mui/icons-material';
import { Handle, } from 'reactflow';
import "./addNode.scss"

const AddNode = ({id,data}) => {


  return (
    <div className='addNode'>
        <Handle id={id} type='target' position='top'/>
        <Handle id={id}  type='source' position='bottom'/>
        {data.label?data.label==="mail"?<Mail className='mail-icon'/>:<HourglassTop className='hourglass-icon'/>:<Add/>}
    </div>
  )
}

export default AddNode
