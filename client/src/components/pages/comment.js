import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import usericon from '../images/usericon.png';
import { AvatarGenerator } from './generator_avatar.ts';

const generator = new AvatarGenerator();


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
        Axios.get('http://localhost:3001/api/comment/comment_id/get').then((response)=>{
        setcommentID((response.data)[0].comment_id+1)
      console.log(((response.data)[0].comment_id), commentID)

  })

    })
    } , [])

    
    let history = useHistory();
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(ReactSession.get('email'));
    const [commentID,setcommentID]=useState(0);
    const [userid,setuserid]=useState("");
    const [newComment,setnewComment]=useState("");
    const [dis, setDis] = useState(true);
    const [open, setOpen] = useState(false);
    const [clickedID, setClickedID] = useState(0);
    const [cardIndex, setCardIndex] = useState(null);
    const [tempCommentID, setTempCommentID] = useState(0);
    
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
      setcommentID(commentID+1)
      console.log(commentID)
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
          {comment_id:(commentID),useremail_reg:username, comment_text:comment, date_written:dateTime, useravatar_url:ReactSession.get('avatar_url')},
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

    const deleteComment=(id)=>{

     
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
          Axios.delete(`http://localhost:3001/api/comment/delete/${id}`)
            const updatedBackendComments = commentList.filter(val => val.comment_id != id);
            setcommentList(updatedBackendComments);
         

        }

      })
      
      
  
    }

    const updateComment=(comment_id)=>{
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
          Axios.put('http://localhost:3001/api/comment/update',{
            comment_text: newComment,
            comment_id: comment_id,

          } )
          const updatedcomm=setcommentList(commentList.map((val) => {   //maps comment for updating
            return val.comment_id == comment_id?{comment_id:val.comment_id,useravatar_url:val.useravatar_url,useremail_reg:val.useremail_reg,comment_text:newComment,date_written:val.date_written}:val
          }))
       
            
        setDis(!dis);
        
        
       
          

        }
      })
     
    }

    const [show, setShow] = useState(false);

    const visibleCard = show ? "show" : "hide";

      
    
    const editing=(val)=>{
      setTempCommentID(val.comment_id)
      setDis(!dis);
      } 
    

      function handleCardIndex(index){
        setCardIndex(index)
        if (show)
           setShow(false)
        else
           setShow(true)
      }

      const toggleCardVisibility = (e) => {
        setOpen((prevState) => !prevState);
      };

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
            <input type="text" name="comment" value={comment} placeholder="Type a response" onChange={(e)=>{setcomment(e.target.value)}}/>
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
            <div>
              <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
              <h2 className='user' value={userid}>{ReactSession.get('username')}</h2>
              </div>
          )
        } 
        
        else {
          return (
            <div>
              
              <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
              <h2 className='user' value={userid}>{val.username_reg}</h2>

            </div>
          )
        }
      })()}
            <p>Comment:{val.comment_text} </p> 
            <label> {convertDate(val.date_written)}</label>

<br></br>

            {/* <button onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
              <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
  <input type="text"></input>
</div> */}

            {(() => {
        if (val.useremail_reg == ReactSession.get("email")) {
          return (
            <div>
            
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            
              </div>
          )
        }           
      })()}
      {(() => {
              if (tempCommentID == val.comment_id && dis==false && val.useremail_reg == ReactSession.get("email") ){
                return(
                  <div>
                    <input type='text' id='editText'  className='updateinput' onChange={(e)=>{setnewComment(e.target.value)}}/>
                    <div>Edit Mode: Enabled<button id='submitEditBtn' className='commentbtn' onClick={()=>{updateComment(val.comment_id)}}>Confirm</button></div>

                  </div>
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
