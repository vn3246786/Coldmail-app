import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { deleteSequence } from '../../apiCalls';

const columns = [
  {
    field: 'Title',
    headerName: 'Sequences',
    width: 500,
  },
  {
    field: 'Edit',
    headerName: 'Edit',
    width: 150,
    renderCell:(params)=>{
      return (<Link className='link'to={"/new-sequence"} state={params.value}>
      <Edit/>
      </Link>)
    }
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 150,
    renderCell:(params)=>{
      const {sequenceId,accesstoken,setState}=params.value
      return <div className="delete" 
      onClick={()=>deleteSequence(sequenceId,accesstoken,setState)}>
        <Delete/>
        </div>
    }
  },
];


export default function Datatable({data,accesstoken,setState}) {
  

function getRows (){
  let rows = []
  if(data&&data.length===0){
    return 
  }else {
   data&& data.map((row)=>{
    const sequenceId =  row.id
rows =[...rows,{id:row.id,Title:row.title,Edit:row.id,Delete:{sequenceId,accesstoken,setState}}]
    })
  }
  return rows
}

  return (
    <Box sx={{ height: "90vh", width: '100%' }}>
      <DataGrid
       sx={{'& .MuiDataGrid-columnHeader':{backgroundColor:'#1b1932',fontSize:"2rem",display:"flex",justifyContent:"center"},
       '& .MuiTablePagination-root':{color:"white",button:{color:"white"}},
       '& .MuiDataGrid-filler':{backgroundColor:'#1b1932'},
       color:'white', backgroundColor: "#1b1932" }}
      disableColumnFilter
      disableColumnMenu
      disableColumnSorting
        rows={getRows()}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
