import React, { useState, useEffect } from 'react';
import Axios from 'axios'

function LoginForm() {

  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      console.log(response.data);
      setuserNameList(response.data)
    })
  }, []) //Calling it once


  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [usernameList, setuserNameList] = useState([])

  const registerUser = () =>{
    //Call the api using Axios
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username, 
      Reg_password: Reg_password
  })
  alert("Registration Successful!")

  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  };

    //Login
  const [log_Username, setLog_Username] = useState('')
  const [log_Password, setLog_Password] = useState('')


  const login_User = ()=>{
    let success = false;
    let i;
    let userNamesPassword = usernameList.map((val) => [val.username_reg, val.userpassword_reg])

    for (i=0;i<userNamesPassword.length;i++){
      console.log([log_Username, log_Password])
      console.log(userNamesPassword[i])
      if([log_Username, log_Password].length === userNamesPassword[i].length && [log_Username, log_Password].every((el) => userNamesPassword[i].includes(el))){
        alert("Login Successful")
        success = true;
        break;
      }
    }

    if (!success)
      alert("Invalid username or password")
  }



  return (
   <div className='Home'>
       <div className='box1'>
        <h1 className='log_h1'>Login</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="username" id="log_username" onChange={(e) => {
                  setLog_Username(e.target.value)
               }} ></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="password" id="log_password" onChange={(e) => {
                  setLog_Password(e.target.value)
               }} ></input>
             </center>
           </div>
           <center><button onClick={login_User}>Login</button></center>
         </div>

         <div>
<h1 className='log_h1'>Register</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="Reg_username" id="reg_user_input" onChange={(e) => {
                  setReg_username(e.target.value)
               }} ></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                  setReg_password(e.target.value)
               }} ></input>
             </center>
           </div>
           <center><button onClick={registerUser}>Register</button></center>
         </div>
              
              {usernameList.map((val)=>{
                  return <h1>ID {val.user_id} | Username: {val.username_reg} | Password: {val.userpassword_reg}</h1>
              })}
       </div>
       </div>

      
   </div> 
  )
}

export default LoginForm;
