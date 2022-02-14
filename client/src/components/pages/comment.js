import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const ctr = 0;
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

function Comment(){

  const[commentList,setcommentList]=useState([]);
    //get comment
    useEffect(() => {
        Axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data)

    })
    } , [])

    
    let history = useHistory();
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(ReactSession.get('email'));
    

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
const forceUpdate = useForceUpdate();

//submit comment
    const submitComment = () => {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
        Axios.post("http://localhost:3001/api/comment/insert", {
            useremail_reg:username,
            comment_text:comment,
            date_written: dateTime,
        })
        setcommentList([
          ...commentList,
          { useremail_reg:username, comment_text:comment, date_written:dateTime },
        ]);
        // forceUpdate();
        console.log(commentList)
      };
      

    function submit(){
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {
          submitComment();
          setcomment(" ");
        
        }
      })
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
            <input type="text" name="comment" value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
            <button onClick={submit}  >Submit</button>
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
            {commentList
            .map((val)=>{
               return (
                <div className="card">
                  {(() => {
        if (String(val.username_reg)=="undefined") {
          return (
            <div>               <h2>{ReactSession.get('username')}</h2> <p>Comment: {val.comment_text}</p> 
            <label> {convertDate(val.date_written)}</label></div>
          )
        } else {
          return (
            <div>               <h2>{val.username_reg}</h2> <p>Comment: {val.comment_text}</p> 
            <label> {convertDate(val.date_written)}</label></div>
          )
        }
        
      })()}

               </div>
               )
                
            })}
            </div>
           
        </div>
    )

    
}
export default Comment;
