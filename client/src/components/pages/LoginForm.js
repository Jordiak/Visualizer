import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import {AvatarGenerator} from './generator_avatar.ts';
import { useLocation, useParams, searchParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';

const generator = new AvatarGenerator();

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


function LoginForm() {
  let query = useQuery();
  let history = useHistory();
  
  const {value,setValue} = useContext(UserContext);
  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data)
      if(query.get("code") && query.get("email")){
        confirmUserParams(response.data, query.get("code"), query.get("email"))
      }
    })
  },[]) //Calling it once
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [usernameList, setuserNameList] = useState([])
  const [code, setCode] = useState("")
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);

  const dis = (param) => {
    setEnableSubmitCode(param);
  }
    //Login
  const [log_Email, setLog_Email] = useState('')
  const [log_Password, setLog_Password] = useState('')

  function correctPass_Confirmed(avatar, username, email, password){ 
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
    ReactSession.set("email", email);
    ReactSession.set("password", password);
    document.getElementById('log_email').value = ''
    document.getElementById('log_password').value = ''
    {setValue(<>
            <li className='nav-item'>
          <input id="check01" type="checkbox" name="menu" className="dropdowninput"/>
          <label for="check01"><span className="nav-links">
          <img src={avatar} className="navavatar"/> {username}</span></label>
          <ul class="submenu">
          <li><img src={avatar} width={80}/></li>
          <br/>
          <li><h2>{username}</h2></li>
          <br/>
            <li><Link to='/profile' className='nav-links'>
            Profile
            </Link></li>
            <br/>
            <li><Link onClick={logOut} className='nav-links'>
            Logout
            </Link></li>
          </ul>
          </li>
  </>)}
    setLog_Password("")
    setLog_Email("")
    Axios.post('http://localhost:3001/api/avatar_get',{
      Reg_email:email}).then((response)=>{
        getUserAvatar(response.data[0]["useravatar_url"], username);
      }) 
  }

  function getUserAvatar(useravatar, uname){
    ReactSession.set('avatar_display', useravatar);
    ReactSession.set("username", uname);
    forceUpdate();
  }

  const login_User = ()=>{
    let isConfirmed = false;
    let success = false;
    Axios.post('http://localhost:3001/api/userpass/check', {
      Reg_email: log_Email, 
      Reg_password: log_Password
  }).then((response) => {
    console.log(response.data);
    if(response.data){
      if(response.data["correct_pass"] && response.data["confirmed"] == 'true'){
           correctPass_Confirmed(response.data["useravatar_url"], response.data["username_reg"], log_Email, log_Password)
           isConfirmed = true;
           success = true;
           console.log(response.data["correct_pass"])
           console.log(response.data["confirmed"])
         }
      else if(response.data["correct_pass"] && response.data["confirmed"] == 'false'){
          Swal.fire({
            icon: 'error',
            title: 'Email has not been confirmed'
          })
          document.getElementById('log_password').value = ''
          Axios.post('http://localhost:3001/api/fetch_user_infos',{
            Reg_email:log_Email}).then((response)=>{setUserInfo(response.data)})
          dis(true)
      }
      else{
          Swal.fire({
            icon: 'info',
            title: 'Invalid Email or Password',
            text: 'Please input a valid email or password',
          })
          document.getElementById('log_password').value = ''
      }
    }
    else{
      alert("Email does not exist")
    }
  });
  }

  const [userInfo, setUserInfo] = useState([]);
  //Confirm User From Link
  function confirmUserParams(userlist, confirmcode, email){
    Swal.fire('Confirming E-mail Address...')
    let i;
    let userNamesConfirmCode = userlist.map((val) => [val.useremail_reg, val.code, val.confirmed, val.userpassword_reg, val.username_reg]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'true'){
          Swal.fire({
            icon: 'success',
            title: 'Account already Confirmed! You can now Log-in.'
          })
          break
      }
      else if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put('http://localhost:3001/api/confirm/update',{
          log_Email: email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Account Confirmed! You can now Log-in.'
          })
        })
        break
      }
      else if((userNamesConfirmCode.length-1) == i){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Parameters'
        })
      }
    }
}
  //Confirm User
  const confirm_User = () => {
    let i;
    let userNamesConfirmCode = usernameList.map((val) => [val.useremail_reg, val.code, val.confirmed]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put('http://localhost:3001/api/confirm/update',{
          log_Email: log_Email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Confirmed Code'
          })
          document.getElementById('log_confirm_code').value = ''
          dis(false);
          setuserNameList(usernameList.map((val) => { 
            return  val.useremail_reg == log_Email?{useremail_reg:val.useremail_reg, username_reg:val.username_reg, userpassword_reg:val.userpassword_reg, useravatar_url:val.useravatar_url, confirmed:'true', code:val.code}:val
          }))

          correctPass_Confirmed('NaN', Reg_username, log_Email, Reg_password)
        })
      }
      else if ((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) != userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Code'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
      else if (((log_Email.trim()) != userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false')){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Email'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
    }
  }
  const forceUpdate = useForceUpdate();

   function logOut(){
    Swal.fire({
      title: 'Are you sure you?',
      text: "Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        ReactSession.remove("username");
        ReactSession.remove("email");
        ReactSession.remove("password");
        ReactSession.remove("avatar_url");
        ReactSession.remove("avatar_display");
        {setValue(<>
          <li className='nav-item'>
        <input id="check01" type="checkbox" name="menu" className="dropdowninput"/>
        <label for="check01"><span className="nav-links">
          <span className="navbicon"><BiUser/> </span>
        Login</span></label>
        <ul class="submenu">
        <li>Log in or Register to join our discussion board and to take the daily quiz!</li>
        <br/>
          <li><Link to='/login-form' className='nav-links'>
          Login
          </Link></li>
          <br/>
          <li><Link to='/register-form' className='nav-links'>
          Register
          </Link></li>
        </ul>
        </li>
</>
        )}
        dis(false);
        forceUpdate();
        history.push("/login-form");
      }
    })
  }

return (
<div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
          history.push("/profile");
        }  else if (enableSubmitCode == true) {
          return (
              <div className='box1-login'>
                
                <div className='login_form'>
                  <h1 className='log_h1' style={{color:'teal'}}>Confirm Code</h1>
                  <br></br>
                  <div className='logbox'>
                      <center>
                        {/* {document.getElementById("log_email").value = log_Email} */}
                        <input type="email" placeholder="Enter Email" value={log_Email} name="email" id="log_email" onChange={(e) => {
                          setLog_Email(e.target.value)
                        }} ></input>
                        </center>
                        <center>
           
                        <input type="text" placeholder="Enter Confirmation Code" name="confirm" id="log_confirm_code" onChange={(e) => {
                           setCode(e.target.value)
                        }} ></input>
                      </center>
                  
                  </div>
                      <center><button style={{width:'auto'}} onClick={confirm_User}>Submit Code</button></center>
                
               <br></br>
               </div>
               </div>
          )
        }
        else{
          return (
          <div className='box1-login'>
          <div className='login_form'>
            <h1 className='log_h1'>Login to Your Account</h1><br/><br/><br/>
            
              
              <div className='logbox'>
                <center>

                  <input placeholder="Enter Email" type="email" name="email" id="log_email" onChange={(e) => {
                     setLog_Email(e.target.value)
                  }} ></input>
                </center>
              </div>
              <div>
                <center>

                  <input type="password" placeholder="Enter Password" name="password" id="log_password" onChange={(e) => {
                     setLog_Password(e.target.value)
                  }} ></input>
                </center>
              </div>
              <center><button className="loginPageButton" onClick={login_User}>Login</button>
              <br></br>
              <Link to="/register-form"><button className="buttonRegLog">Don't have an account?</button></Link></center>
            </div>
          </div>
        )
        }
        
      })()}
          
        </div>
  )
}

export default LoginForm;