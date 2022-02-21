import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
export default function ManageUsers(){
    const [userid]=useState("");
    const [userList,setuserList]=useState([]);
    //get user info
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response)=>{
        setuserList(response.data);
    })
    } , [])
     return(
        
        <div className="ManageUsers">
            <h1 className="backend_title">User Management</h1>
            <br></br>
            <div className="cardholder">
            {
            userList.map((val)=>{
               return (
                <div className="backendcard">
                  {(() => {
          return (
            <div>
                  <img className='usericon' width={'50px'} height={'50px'}src={val.useravatar_url}></img>
                  <h2 className='userinfo' value={userid}>Username: {val.username_reg}</h2>
                  <h2 className='userinfo' value={userid}>Password: {val.userpassword_reg}</h2> 
            </div>
          )
        }
                  )()}
               </div>
               )})}
            
            </div>
        </div>
          
     )
     
  
}