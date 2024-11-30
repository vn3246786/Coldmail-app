import React from 'react'
import {Add, Source} from '@mui/icons-material';
import "./leadSource.scss"
import { Handle, useReactFlow} from 'reactflow';


const LeadSource = ({id,data}) => {

  return (
    <div className='leadSource'>
       <Handle id={id}  type='source'  position='bottom'/>
       <Source className='source-icon'/>
       {data.label?<div className="label">{data.label.length>17?`${data.label.slice(0,17)}...`:data.label}</div>:<Add className='add-icon'/>}
    </div>
  )
}

export default LeadSource
