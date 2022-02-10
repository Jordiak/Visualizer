import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import axios from 'axios';
import Reg_username from './LoginForm';


function Comment(){
    const[commentList,setcommentList]=useState([])
    //get comment
    useEffect(() => {
        axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data)
    })
    } , [])
   
    const [comment,setcomment]=useState("");
    const {value,setValue} = useContext(UserContext);
    const [username,setusername]=useState("");
    


//submit comment
    const submitComment=()=>{
        axios.post('http://localhost:3001/api/comment/insert',{
            username:username,
            comment:comment,
        
        }); 
            setcommentList([
            ...setcommentList,
            {
                username:username,comment:comment
            },
        ]);
        };
    const submit=()=>{
        setusername((value))
        submitComment();
        
    }


    return(
        
        <div className="box1">
            <h1 style={{textAlign:"center"}}>DISCUSSION BOARD</h1>
            <div className="commentform">
                <label >Name:{value}</label>
                
                <label>COMMENT: </label>
                <input type="text" name="comment" onChange={(e)=>{setcomment(e.target.value)}}/>
                <button onClick={submit} >Submit</button>
            </div>
            <div className="cardholder">
            {commentList.map((val)=>{
               return (
                <div className="card">
               <h2> {val.username}</h2> <p>Comment: {val.comment}</p> 
               </div>
               )
                
            })}
            </div>
           
        </div>
    )

    
}
export default Comment;
