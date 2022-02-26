import React, { useState, useEffect } from 'react';
import UserTable from "./UserTable";
import axios from 'axios'

export default function ManageUsers(){
  const [data, setData] = useState([]);

  const columns = [{
    Header: 'Avatar',
    accessor: 'useravatar_url',
    Cell: ({ cell: { value } }) => <img height={30} src={value}/>
  }
  ,{ //displays as an image instead of string
    Header: 'E-Mail',  
    accessor: 'useremail_reg'
   }
   ,{  
    Header: 'Username',  
    accessor: 'username_reg'
    } 
   ,{  
   Header: 'Password',  
   accessor: 'userpassword_reg'
   }
   ,{  
    Header: 'Confirm Status',  
    accessor: 'confirmed'
    }
    ,{  
      Header: 'Code',  
      accessor: 'code'
  }]
  //Gather UserData
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3001/api/get");
      setData(result.data);
    })();
  }, []);

  return (
    <>
    <div className="BackendPage">
      <h2 className="backend_title">User Management</h2>
      <UserTable columns={columns} data={data} />
    </div>
</>
  );
}
