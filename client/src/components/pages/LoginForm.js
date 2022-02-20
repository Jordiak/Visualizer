import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import {AvatarGenerator} from './generator_avatar.ts'

const generator = new AvatarGenerator();


//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


function LoginForm() {
  const {value,setValue} = useContext(UserContext);
  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data)
    })
  },[]) //Calling it once


  function validateEmail (emailAdress)
  {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }

  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [Confirm_password, setConf_password] = useState('')
  const [Reg_email, setReg_email] = useState('')
  const [usernameList, setuserNameList] = useState([])
  const [userSession, setUserSession] = useState("")
  const [avatar_url, set_avatar] = useState(generator.generateRandomAvatar());

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
      if(Reg_username.length < 3)
        Swal.fire({
          icon: 'info',
          title: 'Name is too short',
          text: 'Username must be greater than 3',
        })
      
      else if(Reg_password.length < 5)
          Swal.fire({
      icon: 'info',
      title: 'Password is too short',
      text: 'Password length must be greater than 5.',
    })
    else if(!validateEmail(Reg_email))
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Enter a valid email',
    })
    else if(Reg_password!=Confirm_password){
      Swal.fire({
        icon: 'info',
        title: 'Password Unmatch',
        text: 'Please input matching password',
      })
    }
    else{
    //Call the api using Axios
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password,
      Reg_avatar_url: avatar_url
  });
  setuserNameList([
    ...usernameList,
    { useremail_reg: Reg_email,
      username_reg: Reg_username, 
      userpassword_reg: Reg_password,
      },
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
  {setValue(Reg_username)}
  ReactSession.set("username",Reg_username)
  ReactSession.set("email", Reg_email)
  ReactSession.set("password", Reg_password)
  ReactSession.set("avatar_url",avatar_url)

  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
}
    }
  };

}

    //Login
  const [log_Email, setLog_Email] = useState('')
  const [log_Password, setLog_Password] = useState('')


  const login_User = ()=>{
    let success = false;
    let i;
    let names = usernameList.map((val)=> [val.username_reg])
    let userNamesPassword = usernameList.map((val) => [val.useremail_reg, val.userpassword_reg])
    console.log(userNamesPassword)

    // if([log_Email, log_Password].length === userNamesPassword[i].length && [log_Email, log_Password].every((el) => userNamesPassword[i].includes(el)))

    console.log(log_Email, log_Password)
    if(log_Email != null && log_Password!= null)
      for (i=0;i<userNamesPassword.length;i++){
        if(log_Email+log_Password == userNamesPassword[i][0]+userNamesPassword[i][1]){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
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
          {setValue(names[i])}
          ReactSession.set("username", names[i]);
          ReactSession.set("email", userNamesPassword[i][0]);
          ReactSession.set("password", userNamesPassword[i][1]);
          setLog_Password("")
          setLog_Email("")
          Axios.post('http://localhost:3001/api/avatar_get',{
            Reg_email:ReactSession.get('email')}).then((response)=>{set_avatar(response.data[0]["useravatar_url"])})
            ReactSession.set("avatar_url", avatar_url)
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

  const forceUpdate = useForceUpdate();

   function logOut(){
    Swal.fire({
      icon: 'error',
      title: 'Logged out'
    })
    
  
    Swal.fire({
      title: 'Are you sure you?',
      text: "Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'No',
      cancelButtonText:'Yes'
    }).then((result) => {
      {setValue('Login/Register')}
      if (!result.isConfirmed) {
        ReactSession.remove("username");
        ReactSession.remove("email");
        ReactSession.remove("password");
        ReactSession.remove("avatar_url");
        forceUpdate();
      }
    })
  }


  function changeAvatar()
  {
    let new_avatar = generator.generateRandomAvatar()
    set_avatar(new_avatar)
    ReactSession.set("avatar_url",new_avatar)
    Axios.put('http://localhost:3001/api/avatar/update',{
            Reg_email: ReactSession.get('email'),
          Reg_avatar_url: new_avatar} )
  
  }

  function changePassword(){
    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Enter New Password',
        html:
          'New Password'+'<input type="password" id="swal-input1" class="swal2-input">' + ' <br></br> ' +'Re-Enter New Password' +
          '<input type="password" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      
      if(formValues)
        if (formValues[0] && formValues[1]) {
           let newPass = formValues[0]
           let re_EnterPass = formValues[1]
           if(newPass == re_EnterPass){
             if(newPass.length < 5 || re_EnterPass.length < 5)
                Swal.fire("Password's length must be at least be 5")
            else{
              ReactSession.set("password", newPass)
              Axios.put('http://localhost:3001/api/userpass/update',{
              Reg_email: ReactSession.get("email"),
              Reg_password: re_EnterPass
             } )
             forceUpdate();
            }
          }
          else
              Swal.fire("Passwords do not match")
        }
      else
        Swal.fire("Please enter a value for both fields")
      
      })()
  }

  function changeName(){

    (async () => {

      const { value: userName } = await Swal.fire({
        title: 'Enter New Username',
        input: 'text',
        inputLabel: 'Username',
        inputPlaceholder: 'Enter new username',
        inputAttributes: {
          maxlength: 20,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (userName) {
        Axios.put('http://localhost:3001/api/username/update',{
              Reg_username: userName,
              Reg_email: ReactSession.get("email")
             } )
             {setValue(userName)}
             ReactSession.set("username", userName)
        forceUpdate();
      }
      else
        Swal.fire("Username cannot be blank")
      
      })()

  }

  return (

<div className='Home'>
         {(() => {
        if (ReactSession.get('username')) {
          return (
            <div className='box1'>
              <div className='login_form'>
                <center>
                <img className='usericon' width={'120px'} height={'120px'} src={ReactSession.get('avatar_url')}></img>
                  <h1>Username: {ReactSession.get('username')}</h1>
                     <h1>Email: {ReactSession.get('email')}</h1>
                     <h1>Password: {ReactSession.get('password')}</h1>

                     <button onClick={changeName}>Change Username</button>
                     <button onClick={changePassword}>Change Password</button>
                     <button onClick={changeAvatar}>Change Avatar</button>
                     <br></br>
                     <button onClick={logOut}>Logout</button>
                </center>
              </div>
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
                    <input placeholder="Enter Email" type="email" name="email" id="log_email" onChange={(e) => {
                       setLog_Email(e.target.value)
                    }} ></input>
                  </center>
                </div>
                <div>
                  <center>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter Password" name="password" id="log_password" onChange={(e) => {
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
                    <input type="text" name="Reg_username" placeholder="Enter Username" id="reg_user_input" onChange={(e) => {
                       setReg_username(e.target.value)
                    }} ></input>
     <br></br>
                    <label style={{marginLeft:"22px"}}>Email:</label>
                    <input type="email" name="Reg_email" placeholder="Enter Email" id="reg_email" onChange={(e) => {
                       setReg_email(e.target.value)
                    }} ></input>
     <br></br>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter Password" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                       setReg_password(e.target.value)
                    }} ></input>

                    <br></br>
                    <label>Confirm Password:</label>
                    <input style={{marginRight:"69px"}} placeholder="Confirm Password" type="password" name="Confirm_password" id="confirm_user_pass" onChange={(e) => {
                       setConf_password(e.target.value)
                    }} ></input>
                  </center>
                </div>
                <center><button onClick={registerUser}>Register</button></center>
              </div>
                   
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
