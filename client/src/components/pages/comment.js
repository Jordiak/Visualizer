import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  


function Comment(){
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
    const[commentList,setcommentList]=useState([])
    //get comment
    useEffect(() => {
        axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data)
        console.log(dateTime)
    })
    } , [])

    
    let history = useHistory();
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(ReactSession.get('email'));
    

    const forceUpdate = useForceUpdate();
    
//submit comment
    const submitComment=()=>{
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
        axios.post('http://localhost:3001/api/comment/insert',{
            useremail_reg:username,
            comment_text:comment,
            date_written: dateTime
        
        }); 
        //     setcommentList([
        //     ...setcommentList,
        //     {   useremail_reg:username,
        //         comment_text:comment,
        //         date_written:dateTime
        //     },
        // ]);
        
        };
    
    const submit=()=>{
        setusername(ReactSession.get('username'));
        submitComment();
    }

    function Login(){
        history.push("/login-form");
        console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
        
    }


    function convertDate(date_value){
      return new Date(date_value).toLocaleString();
    }

  

    return(
        
        <div className="box1">
            <h1 style={{textAlign:"center"}}>DISCUSSION BOARD</h1>
            <div className="commentform">

      {(() => {
        if (ReactSession.get("username")) {
          return (
            <div className="commentform">
                <label >Name:{ReactSession.get("username")}</label>
                
            <label>COMMENT: </label>
            <input type="text" name="comment" onChange={(e)=>{setcomment(e.target.value)}}/>
            <button onClick={submit} >Submit</button>
            </div>
          )
        } else {
          return (
            <div className="commentform">
              <label>Login to join the discussion!</label>
              <button onClick={Login} >Login</button>
              </div>
          )
        }
      })()}
                
            </div>
            <div className="cardholder">
            {commentList.map((val)=>{
               return (
                <div className="card">
               <h2> {val.username_reg}</h2> <p>Comment: {val.comment_text}</p> 
               <label>{convertDate(val.date_written)}</label>
               {/* <label>Day:{val.date_written.substring(5,7)}</label><label>Month:{val.date_written.substring(8,10)}</label><label> Time:{convertDate(val.date_written.substring(14,19))}</label> */}
               </div>
               )
                
            })}
            </div>
           
        </div>
    )

    
}
export default Comment;
