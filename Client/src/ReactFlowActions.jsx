
export const initialNodes = [
    { id: 's-1', position: { x: 100, y: 100 }, data: {label:null }, type:"LeadSource"},
  ];
  
 export const initialEdges = [];


export function AddSourceNode(setNodes,setEdges,id,formData,nodes){
    setNodes((prevNodes)=>{
        let edit = false
  const nodes = prevNodes.map((node)=>{
    if(node.id===id){
      edit=node.data.label?true:false
      return {...node,data:{label:formData.title,formData:formData}}
    }else return node
  })
  if(prevNodes.length===1){
    return [...nodes,
      {id:`1`,position: { x: 150, y:200}, data: {label:null }, type:"AddNode" },
      {id:`s-2`,position:{ x:270,y:100},data:{label:null},type:"LeadSource"}
    ]
  }else if(!edit){
   
    function getlastSource(){
      let lastSourceId = ""
      let lastSourcePosition = 0
      prevNodes.map((node)=>{
  if(node.id.includes("s")){
    lastSourceId=node.id
    lastSourcePosition=node.position.x
  }else return
      })
      return {lastSourceId, lastSourcePosition}
    }
  
  const {lastSourceId,lastSourcePosition}=getlastSource()
  
    return [...nodes,{id:`s-${Number(lastSourceId.split("-")[1])+1}`,position:{ x:lastSourcePosition+170, y: 100 },data:{label:null},type:"LeadSource"}]
  }else return nodes
      })
      nodes.length===1&&setEdges([{id:"e[s-1]-1",source:"s-1" ,target:"1"}])
}


export function AddOptionsNode(setNodes,setEdges,id,formData,type){
    let edit = false
        setNodes((prevNodes)=>{

          function getlastSource(){
            let lastOptionId = ""
            let lastOptionPosition = 0
            prevNodes.map((node)=>{
        if(!node.id.includes("s")){
          lastOptionId=node.id
          lastOptionPosition=node.position.y
        }else return
            })
            return {lastOptionId, lastOptionPosition}
          }
     const {lastOptionId,lastOptionPosition}=getlastSource()

    const nodes = prevNodes.map((node)=>{
      if(node.id===id){
        edit=node.data.label?true:false
        return {...node,data:{label:type,formData:formData}}
      }else return node
    })
    if(lastOptionId==="1"){
      return [...nodes,
        {id:`2`,position: { x: 150, y:300}, data: {label:null }, type:"AddNode" },
      ]
    }else if(!edit){
      return [...nodes,{id:`${Number(lastOptionId)+1}`,position:{ x:150, y: lastOptionPosition+100 },data:{label:null},type:"AddNode"}]
    }else return nodes
        })
        id==="1"&&!edit&&setEdges((prevEdges)=>{
          return [...prevEdges,{id:"e1-2",source:"1" ,target:"2"}]
        })
        Number(id)>1 && !edit && setEdges((prevEdges)=>{
          return [...prevEdges,{id:`e${Number(id)}-${Number(id)+1}`,source:id, target:`${Number(id)+1}`}]
        })
}


export function deleleHorrizontalNode(id,setNodes,setEdges){
  let filteredNode=[]
  function sourceNumber(){
    let num = 0
    filteredNode.map((node)=>{
     if(node.id.includes("s")){
     num = num+1
     }else return
         })
         return num
} 
    setNodes((prevNodes)=>{
     filteredNode= prevNodes.filter((node)=>{return node.id!==id})
    
    if(sourceNumber()===1){
        return initialNodes
    }else{
        return filteredNode.map((node)=>{
            if(Number(node.id.split("-")[1])>Number(id.split("-")[1])&&node.id.includes("s")){
          return {...node,id:`s-${Number(node.id.split("-")[1])-1}`,position:{...node.position,x:node.position.x-170}}
            }else return node
          })
    }
    })
    sourceNumber()===1&&setEdges(initialEdges)
    }

   export function deleleVerticalNode(setNodes,setEdges,id){
        setNodes((prevNodes)=>{
        const filteredNode= prevNodes.filter((node)=>{return node.id!==id})
        return filteredNode.map((node)=>{
          if(Number(node.id)>Number(id) && !node.id.includes("s")){
        return {...node,id:`${Number(node.id)-1}`,position:{...node.position,y:node.position.y-100}}
          }else return node
        })
        })
        setEdges((prevEdges)=>{
          if(prevEdges.length===1){
            return
          }else
          return prevEdges.filter((edge)=>{
            return prevEdges[prevEdges.length-1].id!==edge.id})    
        })
        }   