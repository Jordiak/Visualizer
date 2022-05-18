import React, { useState } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {AvatarGenerator} from './generator_avatar.ts';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const generator = new AvatarGenerator();

function RegisterForm() {
    let history = useHistory();

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
  const [confirmed, setConfirmed] = useState("false");
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);

  const dis = (param) => {
    setEnableSubmitCode(param);
  }
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
    //Generate Random Code for E-Mail Confirmation
    let new_avatar = generator.generateRandomAvatar()
    // set_avatar(new_avatar)

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTimeSQL = date+' '+timeSQL;

    ReactSession.set("avatar_url", new_avatar)
    const min = 100000;
    const max = 1000000;
    const rand = String(Math.round(min + Math.random() * (max - min)));
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password,
      Reg_avatar_url: new_avatar,
      confirmed: confirmed,
      code: rand,
      user_created: dateTimeSQL
  });
  setuserNameList([
    ...usernameList,
    { useremail_reg: Reg_email,
      username_reg: Reg_username, 
      userpassword_reg: Reg_password,
      confirmed: confirmed,
      code: rand,
      },
  ])

  Axios.post('http://localhost:3001/api/fetch_user_infos',{
    Reg_email:Reg_email}).then((response)=>{setUserInfo(response.data)})

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
    title: 'Registration Successful! \n\nPlease confirm \nyour E-mail and \nenter your \nconfirmation code'
  })
  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
  document.getElementById('confirm_user_pass').value =''
  history.push("/login-form");
  //Sending Confirmation E-mail
  try{
    Axios.post('http://localhost:3001/api/sendemail', {
        code: rand,
        email: Reg_email,
    });
  }
  catch{
    console.log('Invalid E-mail')
  }
  dis(true);
  
}
    }
  };

}
  const [userInfo, setUserInfo] = useState([]);
    return (

        <div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
            history.push("/profile");
        }
        else{
          return (
            <div className='box1-login'>
            <div className='login_form'>
            <h1 className='log_h1'>Create an Account</h1>
                <br/>
                <center>
                  <input type="text" name="Reg_username" placeholder="Enter Username" id="reg_user_input" onChange={(e) => {
                     setReg_username(e.target.value)
                  }} ></input>
                <br/>    
                  <input type="email" name="Reg_email" placeholder="Enter Email" id="reg_email" onChange={(e) => {
                     setReg_email(e.target.value)
                  }} ></input>
                <br/>
                  <input type="password" placeholder="Enter Password" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                     setReg_password(e.target.value)
                  }} ></input>
                <br/>
                  <input placeholder="Confirm Password" type="password" name="Confirm_password" id="confirm_user_pass" onChange={(e) => {
                     setConf_password(e.target.value)
                  }} ></input>
              <center><button className="loginPageButton" onClick={registerUser}>Register</button></center>
              <Link to="/login-form"><button className="buttonRegLog">Already have an account?</button></Link></center>
            </div>
          </div>
          )
        }
      })()}
        </div>
  )
}

export default RegisterForm;