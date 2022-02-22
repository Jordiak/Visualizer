import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import usericon from '../images/usericon.png';
import { AvatarGenerator } from './generator_avatar.ts';
import { render } from '@testing-library/react';

const generator = new AvatarGenerator();

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default function Comment(){

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
    const [commentCount, setCommentCount] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const [editCount, setEditCount] = useState(0);
    const [commentList,setcommentList]=useState([]);
    const [replies, setReplyList] = useState([]);
    const [backupCommentList, setBackupCommentList] =useState([])
    const [replyValue, setReplyValue] = useState("")


    
    //get comment and replies
    useEffect(() => {
      Axios.post('http://localhost:3001/api/reply_get').then((response)=>{
        setReplyList(response.data);
    });
        Axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data);
    });
    } , [])

    //append replies to comment
    useEffect(() => {
      appendReplies(commentList)
  } , [commentList])

    useEffect(() => {
     if (commentList.length){
        setBackupCommentList([...commentList])
     }
  } , [commentList])


  function appendReplies(comments){
    for (let i = 0; i < comments.length; i++) {
      for (let j = 0; j < replies.length; j++) {
        if(replies[j]["comment_id"] == comments[i]["comment_id"]){
          if(!comments[i]["reply_details"])
               comments[i]["reply_details"] = [replies[j]]
          else
               comments[i]["reply_details"].push(replies[j])

            console.log(comments[i]);
        }
      }

      // console.log(comments[i]);
    }
    setcommentList(comments)
  }

    
    
    
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
        Axios.get('http://localhost:3001/api/comment/comment_id/get').then((response)=>{
        console.log(((response.data)[0].comment_id))
        setcommentList([
          ...commentList,
          {comment_id:((response.data)[0].comment_id+1),useremail_reg:username, comment_text:comment, date_written:dateTime, useravatar_url:ReactSession.get('avatar_url')},
        ]);
      }) 
      setCommentCount(commentCount + 1)
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
          setcomment("");
        
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
            setDeleteCount(deleteCount + 1);
            setcommentList([...updatedBackendComments]);
         

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
          setEditCount(editCount + 1);
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

      function submitReply(replyMessage, comm_ID){
        {
          let new_reply = [];
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
            Axios.post("http://localhost:3001/api/reply_insert", {
                Reg_email:ReactSession.get("email"),
                Reply_content:replyMessage,
                Reply_written: dateTime,
                Comment_ID:comm_ID
            })



 
var newCommentList= [];

              if(commentList[0]["comment_id"] == comm_ID){
                var tempHolder = commentList[0]["reply_details"]
                tempHolder.push({"reply_id":62,
                "comment_id":comm_ID,"useravatar_url":ReactSession.get("avatar_url"),
                "reply_content":replyMessage,"reply_written":dateTime,"useremail_reg":ReactSession.get("email"), 
                "username_reg":ReactSession.get("username")})
                // reply_details.push(tempHolder)
                
                  newCommentList.push({"username_reg":commentList[0]["username_reg"],"useremail_reg":commentList[0]["useremail_reg"],
                  "comment_id":commentList[0]["comment_id"],"comment_text":commentList[0]["comment_text"],
                  "date_written":commentList[0]["date_written"],"reply_details":tempHolder,
                   "useravatar_url":commentList[0]["useravatar_url"],
                   "useremail_reg":commentList[0]["useremail_reg"],
                  "username_reg":commentList[0]["username_reg"]})
              }

console.log(newCommentList)
// setcommentList(newCommentList)
appendReplies(commentList)

          };
      }



     return(
        
        <div className="box1">
            <h1 style={{textAlign:"center"}}>DISCUSSION BOARD</h1>
            <br></br>
            <div className="commentform">

      {(() => {
        if (ReactSession.get("username") && commentCount == 2){
          return (
            <div className="commentform">
                <label >Name:{ReactSession.get("username")}</label>
                
            <label>Adding comments is restricted to 2 at a time</label>
            </div>
          )
        }
        else if (ReactSession.get("username")) {
          return (
            <div className="commentform">
              <center><h2>{ReactSession.get("username")}</h2>
              <img className='usericon' width={'70px'} height={'90px'}src={ReactSession.get("avatar_url")}></img>
              </center>
                
                
            {/* <label>COMMENT: </label> */}
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
        {(() => { 
          if (!commentList.length){
            console.log('comment list was emptied')
            console.log(backupCommentList)
            setcommentList([...backupCommentList])
          }
        })}
            {
            commentList
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


            {ReactSession.get("email") == val.useremail_reg ? <div><button className='replybtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
              <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
  <input onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
</div></div> : ""}

                    



            {(() => {
        if (val.useremail_reg == ReactSession.get("email") && deleteCount==2 && editCount==2){
          return (
            <div>
            
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            
              </div>
          )
        }
        else if (val.useremail_reg == ReactSession.get("email") && deleteCount==2){
          return (
            <div>
            
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            
              </div>
          )
        }
        else if (val.useremail_reg == ReactSession.get("email") && editCount==2){
          return (
            <div>
            
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            
              </div>
          )
        }
        else if (val.useremail_reg == ReactSession.get("email")) {
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


{/* Replies */}
{val.reply_details ? <div>
              Replies:
        {val.reply_details.map((item) => (
          <div className="replyholder">
            
            {item.username_reg}
            <br></br>
            <img src={item.useravatar_url} width="20px" height="20px"></img>
            <span className="reply_message">{item.reply_content}</span>
            <br></br>
            {convertDate(item.reply_written)}
            
          </div>
          
        ))}
              </div> : ""}
               </div>

               
               )

          
            })}
            
            </div>
        </div>
          
     )
     
  
}




