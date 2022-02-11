import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  

function Comment(){
    const[commentList,setcommentList]=useState([])
    //get comment
    useEffect(() => {
        axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data)
    })
    } , [])
   
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(ReactSession.get('email'));
    

    const forceUpdate = useForceUpdate();
    
//submit comment
    const submitComment=()=>{
        axios.post('http://localhost:3001/api/comment/insert',{
            useremail_reg:username,
            comment_text:comment,
        
        }); 
        //     setcommentList([
        //     ...setcommentList,
        //     {
        //         useremail_reg:username,
        //         comment_text:comment
        //     },
        // ]);
        
        };
    
    const submit=()=>{
        setusername(ReactSession.get('username'));
        submitComment();
        axios.get('http://localhost:3001/api/comment/get').then((response)=>{
            setcommentList(response.data)
        })
        forceUpdate();
    }


    return(
        
        <div className="box1">
            <h1 style={{textAlign:"center"}}>DISCUSSION BOARD</h1>
            <div className="commentform">
                <label >Name:{ReactSession.get("username")}</label>
                
                <label>COMMENT: </label>
                <input type="text" name="comment" onChange={(e)=>{setcomment(e.target.value)}}/>
                <button onClick={submit} >Submit</button>
            </div>
            <div className="cardholder">
            {commentList.map((val)=>{
               return (
                <div className="card">
               <h2> {val.username_reg}</h2> <p>Comment: {val.comment_text}</p> 
               </div>
               )
                
            })}
            </div>
           
        </div>
    )

    
}
export default Comment;
