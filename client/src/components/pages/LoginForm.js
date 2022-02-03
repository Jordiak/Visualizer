import React, { useState, useEffect } from 'react';
import Axios from 'axios'

function LoginForm() {

  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')

  const registerUser = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username, 
      Reg_password: Reg_password
  })
  alert("Registration Successful!")
  };

  return (
   <div className='Home'>
       <div className='box1'>
        <h1 className='log_h1'>Login</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="username"></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="password"></input>
             </center>
           </div>
           <center><button>Login</button></center>
         </div>

         <div>
<h1 className='log_h1'>Register</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="Reg_username" onChange={(e) => {
                  setReg_username(e.target.value)
               }} ></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="Reg_password"onChange={(e) => {
                  setReg_password(e.target.value)
               }} ></input>
             </center>
           </div>
           <center><button onClick={registerUser}>Register</button></center>
         </div>

       </div>
       </div>

      
   </div> 
  )
}

export default LoginForm;
