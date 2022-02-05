import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2'

function LoginForm() {

  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data)
    })
  },[]) //Calling it once


  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [Reg_email, setReg_email] = useState('')
  const [usernameList, setuserNameList] = useState([])

  const registerUser = () =>{
    if (document.getElementById('reg_user_input').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a username.',
    })
    else if (document.getElementById('reg_user_pass').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a password.',
    })
    else if (document.getElementById('reg_email').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter an email.',
    })
    else{
    let emails = usernameList.map((val)=> val.useremail_reg)

    //Validation of email PK
    if(emails.includes(Reg_email)){
    Swal.fire({
      icon: 'error',
      title: 'Email already taken',
      text: 'Enter another email.',
    })
    document.getElementById('reg_email').value = ''
  }
    
    else{
    //Call the api using Axios
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password
  });
  setuserNameList([
    ...usernameList,
    { useremail_reg: Reg_username,
      username_reg: Reg_email, 
      userpassword_reg: Reg_password},
  ])
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Registration Successful!'
  })
  ReactSession.set("username",Reg_username)
  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
}
  };
  // console.log(ReactSession.get("username"))
  console.log(usernameList)
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

    // if([log_Email, log_Password].length === userNamesPassword[i].length && [log_Email, log_Password].every((el) => userNamesPassword[i].includes(el)))

    console.log(log_Email, log_Password)
    if(log_Email != null && log_Password!= null)
      for (i=0;i<userNamesPassword.length;i++){
        console.log([userNamesPassword[i][0], userNamesPassword[i][1]])
        console.log([log_Email, log_Password])
        if(log_Email+log_Password == userNamesPassword[i][0]+userNamesPassword[i][1]){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          success = true;
          
          document.getElementById('log_email').value = ''
          document.getElementById('log_password').value = ''

          ReactSession.set("username", names[i]);
          ReactSession.set("email", userNamesPassword[i][0]);
          ReactSession.set("password", userNamesPassword[i][1]);
          setLog_Password("")
          setLog_Email("")
          break;
        }
    }

    if (!success){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email or Password'
      })
      document.getElementById('log_password').value = ''
    }
  }



  return (

<div className='Home'>
         {(() => {
        if (ReactSession.get('username')) {
          return (
            <div><h1>Username: {ReactSession.get('username')}</h1>
                 <h1>Email: {ReactSession.get('email')}</h1>
                 <h1>Password: {ReactSession.get('password')}</h1>
                 <button>Logout</button>
            </div>
          )
        }  else {
          return (
              <div className='box1'>
              <div className='login_form'>
              <h1 className='log_h1'>Login</h1>
              <br></br>
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
                    <input type="password" name="password" id="log_password" onChange={(e) => {
                       setLog_Password(e.target.value)
                    }} ></input>
                  </center>
                </div>
                <center><button onClick={login_User}>Login</button></center>
              </div>
     
              <div>
              <div className='login_form'>
              <h1 className='log_h1'>Register</h1>
              <br></br>
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
                    <input type="password" name="Reg_password" id="reg_user_pass" onChange={(e) => {
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
     
          )
        }
      })()}
          
        </div>
  )
}

export default LoginForm;
