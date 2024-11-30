import axios from "axios"
import { toast } from "react-toastify"
import { findError } from "./ErrorFinder"

const URL =import.meta.env.VITE_BACKEND_URL

export async function register(dispatch,formData){
    console.log(URL)
dispatch({type:"start"})
try {
    const res =await axios.post(`${URL}/api/auth/register`,formData)
    if(findError(res.data)){
        dispatch({type:"failure",payload:res.data})
        toast.error(res.data)
    }else {
        dispatch({type:"success",payload:res.data})
        toast.success("successfully registered")
    }
} catch (error) {
    toast.error("Network error")
    dispatch({type:"failure",payload:"Network error"})
}
}

export async function login(dispatch,formData){

dispatch({type:"start"})
try {
    const res =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,formData)
    if(findError(res.data)){
        dispatch({type:"failure",payload:res.data})
        toast.error(res.data)
    }else {
        dispatch({type:"success",payload:res.data})
        toast.success("successfully logged in")
    }
} catch (error) {
    toast.error("Network error")
    dispatch({type:"failure",payload:"Network error"})
}
}

export async function getSequencList(setState,id,accesstoken){
setState({loading:true,data:null,error:null})
try {
    const res = await axios.get(`${URL}/api/user/sequences/${id}`,{
        headers:{
            token:"bearer "+accesstoken
        }
    })
if(findError(res.data)){
    setState({loading:false,data:null,error:res.data}) 
}else {
    setState({loading:false,data:res.data,error:null})
}
} catch (error) {
    setState({loading:false,data:null,error:"Network error"}) 
}
}

export async function getSequence(setState,id,accesstoken,setNodes,setEdges,setInputData){
setState({loading:true,error:null})
try {
    const res = await axios.get(`${URL}/api/task//${id}`,{headers:{
        token:"bearer "+accesstoken}
    })
if(findError(res.data)){
    setState({loading:false, error:res.data
    }) 
}else {
    setState({loading:false,data:res.data,error:null})
setNodes(res.data.nodes)
setEdges(res.data.edges)
setInputData(res.data.title)
}
} catch (error) {
    console.log(error)
    setState({loading:false,error:"Network error"
    }) 
}
}

export async function saveSequence(setState,type,data,id,accesstoken){
    setState(true)
    try {
       if(type==="new"){
const res =await axios.post(`${URL}/api/task/create/${id}`,data,{headers:{
    token:"bearer "+accesstoken}
})
if(findError(res.data)){
    toast.error(res.data)
    setState(false)
}else{
    toast.success(res.data)
    setState(false)
}
       }else {
        const res =await axios.put(`${URL}/api/task/update/${id}`,data,{headers:{
            token:"bearer "+accesstoken}
        })
        if(findError(res.data)){
            toast.error(res.data)
            setState(false)
        }else{
            toast.success(res.data)
            setState(false)
        }
       }
    } catch (error) {
        console.log(error)
        toast.error("Network error")
        setState(false)
    }
}


export async function deleteSequence(sequenceId,accesstoken,setState){
    setState(true)
    try {
const res =await axios.delete(`${URL}/api/task/delete/${sequenceId}`,{headers:{
    token:"bearer "+accesstoken}
})
if(findError(res.data)){
    toast.error(res.data)
    setState(false)
}else{
    toast.success(res.data)
    setState(false)
}  
    } catch (error) {
        toast.error("Network error")
        setState(false)
    }
}