import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import ReactSession from 'react-client-session/dist/ReactSession';

function LoginForm() {

  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      console.log(response.data);
      setuserNameList(response.data)
    })
  }) //Calling it once


  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [Reg_email, setReg_email] = useState('')
  const [usernameList, setuserNameList] = useState([])

  const registerUser = () =>{
    if (document.getElementById('reg_user_input').value == '')
      alert("Enter a username")
    else if (document.getElementById('reg_user_pass').value == '')
      alert("Enter a password")
    else if (document.getElementById('reg_email').value == '')
      alert("Enter an email")
    else{
    let emails = usernameList.map((val)=> val.useremail_reg)

    //Validation of email PK
    if(emails.includes(Reg_email))
      alert("Email already exists! Please enter a new one.")
    
    else{
    //Call the api using Axios
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password
  })
  alert("Registration Successful!")
}
  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
  };
  console.log(ReactSession.get("username"))

}

    //Login
  const [log_Email, setLog_Email] = useState('')
  const [log_Password, setLog_Password] = useState('')


  const login_User = ()=>{
    let success = false;
    let i;
    let names = usernameList.map((val)=> [val.username_reg])
    let userNamesPassword = usernameList.map((val) => [val.useremail_reg, val.userpassword_reg])
    // console.log(userNamesPassword)
    // console.log(log_Email, log_Password)
    if(log_Email != "" && log_Password!= "")
      for (i=0;i<userNamesPassword.length;i++){
        if([log_Email, log_Password].length === userNamesPassword[i].length && [log_Email, log_Password].every((el) => userNamesPassword[i].includes(el))){
          alert("Login Successful")
          success = true;
          
          document.getElementById('log_email').value = ''
          document.getElementById('log_password').value = ''

          ReactSession.setStoreType("localStorage");
          ReactSession.set("username", names[i]);

          break;
        }
    }

    if (!success)
      alert("Invalid username or password")
  }



  return (
   <div className='Home'>
       <div className='box1'>
         <div className='login_form'>
         <h1 className='log_h1'>Login</h1>
           <div className='logbox'>
             <center>
               <label style={{marginLeft:"24px"}}>Email:</label>
               <input type="text" name="email" id="log_email" onChange={(e) => {
                  setLog_Email(e.target.value)
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
         <div className='login_form'>
         <h1 className='log_h1'>Register</h1>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="Reg_username" id="reg_user_input" onChange={(e) => {
                  setReg_username(e.target.value)
               }} ></input>
<br></br>
               <label style={{marginLeft:"22px"}}>Email:</label>
               <input type="text" name="Reg_email" id="reg_email" onChange={(e) => {
                  setReg_email(e.target.value)
               }} ></input>
<br></br>
               <label>Password:</label>
               <input type="text" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                  setReg_password(e.target.value)
               }} ></input>
             </center>
           </div>
           <center><button onClick={registerUser}>Register</button></center>
         </div>
              
              {/* {usernameList.map((val)=>{
                  return <h1>ID {val.user_id} | Username: {val.username_reg} | Password: {val.userpassword_reg}</h1>
              })} */}
              {ReactSession.get("username")}
       </div>
       </div>

      
   </div> 
  )
}

export default LoginForm;
