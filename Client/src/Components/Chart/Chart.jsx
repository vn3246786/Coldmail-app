import { useCallback, useContext, useEffect, useState } from 'react';
import "./chart.scss"
import ReactFlow, { Background, useNodesState, useEdgesState,addEdge,} from 'reactflow';
import 'reactflow/dist/style.css';
import AddNode from '../NodeTypes/AddNode/AddNode';
import LeadSource from '../NodeTypes/LeadSource/LeadSource';
import CreateLeadSource from '../Models/CreateLeadSource/CreateLeadSource';
import NodeOptionsModel from '../Models/NodeOptionsModel/NodeOptionsModel';
import CreateEmailModel from '../Models/CreateEmailModel/CreateEmailModel';
import EditOrDeleteNode from '../Models/EditOrDeleteNode/EditOrDeleteNode';
import { initialEdges, initialNodes } from '../../ReactFlowActions';
import WaitModel from '../WaitModel/WaitModel';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteSequence, getSequence, saveSequence } from '../../apiCalls';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import ErrorPage from '../ErrorPage/ErrorPage';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const nodetypes = {
  LeadSource:LeadSource,
  AddNode:AddNode
}



const Chart=()=> {

const {state}=useLocation()
const navigate =useNavigate()

const {User}=useContext(UserContext)

const [data,setdata]=useState({
  loading:false,
  error:null
})

const [inputData,setInputData]=useState("")

const [saveResponse,setSaveResponse]=useState(false)

function isClickable(){
let click =false
nodes.forEach((node)=>{
if(Number(node.id)>=2){
  click=true
}
})
return click
}

  useEffect(()=>{
state&&getSequence(setdata,state,User.accessToken,setNodes,setEdges,setInputData)
  },[])

  const[currentNode,setCurrentNode]=useState(null)

const [createsourceModel,setCreateSourceModel]=useState(false)
const [optionsModel,setOptionsModel]=useState(false)
const[editOptionModel,setEditOptionModel]=useState({visible:false,type:null})
const [createNewMailModel,setCreateNewMailModel]=useState(false)
const[waitModel,setWaitModel]=useState(false)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

function onNodeClick(e,node){
  setCurrentNode(node.id)
  if(node.type==="LeadSource"&&node.data.label){
    setEditOptionModel({visible:true,type:node.type})
  }else if(node.type==="AddNode"&&node.data.label){
    setEditOptionModel({visible:true,type:node.type})
  }else if(node.type==="LeadSource"&&!node.data.label){
    setCreateSourceModel(true)
  }else if(node.type==="AddNode"&&!node.data.label){
setOptionsModel(true)
  }else return
}

function onSaveClick(type){
  if(inputData){
    saveSequence(setSaveResponse,type,{id:state,from:{email:User.email,title:User.organisation},title:inputData,nodes:nodes,edges:edges},User._id,User.accessToken) 
  }else toast.error("Title is required")
}

  async function remove(){
 await deleteSequence(state,User.accessToken,setSaveResponse)
  navigate("/")
}

  return (
    <div className="chart">
    {createsourceModel&&<CreateLeadSource setCreateSourceModel={setCreateSourceModel} id={currentNode} setNodes={setNodes} setEdges={setEdges} nodes={nodes}/>}
    {optionsModel&&<NodeOptionsModel setOptionsModel={setOptionsModel} id={currentNode} setCreateNewMailModel={setCreateNewMailModel} nodes={nodes} setWaitModel={setWaitModel}/>}
    {createNewMailModel&&<CreateEmailModel  id={currentNode} setNodes={setNodes} setCreateNewMailModel={setCreateNewMailModel} setEdges={setEdges} />}
    {editOptionModel.visible&&<EditOrDeleteNode setCreateSourceModel={setCreateSourceModel} setEditOptionModel={setEditOptionModel} setOptionsModel={setOptionsModel} editOptionModel={editOptionModel} id={currentNode} setNodes={setNodes} setEdges={setEdges}/>}
    {waitModel&&<WaitModel id={currentNode} setEdges={setEdges} setNodes={setNodes} setWaitModel={setWaitModel}/>}

<div className="btn-container">
  <input type="text" className='input'  placeholder='Title' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
{!state&&isClickable()&&<button onClick={()=>onSaveClick("new")} className='btn'>Save and schedule</button>}
{state&&isClickable()&&<button onClick={()=>onSaveClick("edit")} className='btn'>Edit and schedule</button>}
{state&&isClickable()&&<button onClick={()=>remove()} className='btn-delete'>Delete</button>}
</div>

{state&&data.error&&<ErrorPage/>}
{(data.loading||saveResponse)&&<CircularProgress className='spinner' size={70}/>}  
    {!data.error&&<ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodetypes}
      onNodeClick={onNodeClick}
    >
      <Background />
    </ReactFlow>}
    </div>
  );
}
export default Chart