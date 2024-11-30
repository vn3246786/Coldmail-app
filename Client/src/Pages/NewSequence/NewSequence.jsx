import React from 'react'
import "./newSequence.scss"
import Chart from '../../Components/Chart/Chart'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import { useLocation } from 'react-router-dom'

const NewSequence = () => {


  return (
    <div className='newSequence'>
      <Navbar />
      <div className="container">
      <Sidebar/>
      <Chart />
      </div>
    </div>
  )
}

export default NewSequence
