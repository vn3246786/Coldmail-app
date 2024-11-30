import React, { useContext, useEffect, useState } from 'react'
import "./home.scss"
import Datatable from '../../Components/Datatable/Datatable'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import { getSequencList } from '../../apiCalls'
import { UserContext } from '../../Contexts/UserContext/UserContext'
import { CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom'

const Home = () => {

const {User}=useContext(UserContext)

const {pathname} = useLocation()


  const [sequences,setSequences]=useState({
    loading:false,
    data:null,
    error:null
  })

  const [deleteResponse,setDeleteResponse]=useState(false)

useEffect(()=>{
  !deleteResponse&& getSequencList(setSequences,User._id,User.accessToken)
},[deleteResponse])



  return (
    <div className='home' >
          {sequences.loading&&<CircularProgress className='spinner' size={70}/>}  
    <Navbar/>
      <div className="container">
      <Sidebar/>
      <Datatable data={sequences.data} accesstoken={User.accessToken} setState={setDeleteResponse} userId={User._id} />
      </div>
    </div>
  )
}

export default Home
