import React, { useState, useEffect} from 'react';
import Axios from 'axios';


export default function Dashboard(){
    const [userStats,setuserStats]=useState([]);
    const [commentStats,setcommentStats]=useState([]);
    const [questionStats,setquestionStats]=useState([]);
    //get stats
    useEffect(() => {
      Axios.get('http://localhost:3001/api/admin/user_stats').then((response)=>{setuserStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_replies_stats').then((response)=>{setcommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_questions_stats').then((response)=>{setquestionStats(response.data)});
    } , [])
    if(localStorage.getItem("adminusername")){
     return(
        <div className="BackendPage">
            <h2 className="backend_title">Dashboard</h2>
            <br></br>
            <div className="cardholder">
            {
            commentStats.map((val)=>{
               return (
                <div className="backendcard">
                  <h1>Comments</h1>
                  {(() => {
          return (
            <div>
              <h2>Total Comments: {val.Comments}</h2>
            </div>
              )})()}
              </div>
               )})}
                           {
            questionStats.map((val)=>{
               return (
                <div className="backendcard">
                  <h1>Questions</h1>
                  {(() => {
          return (
            <div>
              <h2>Total Questions: {val.Questions}</h2>
            </div>
              )})()}
              </div>
               )})}
            {
            userStats.map((val)=>{
               return (
                <div className="backendcard">
                  <h1>Users</h1>
                  {(() => {
          return (
            <div>
              <h2>Verified Users: {val.Verified_Users}</h2>
              <h2>Total Users: {val.Total_Users}</h2>
            </div>
              )})()}
              </div>
               )})}
            </div>
        </div>  
     )
    }
    else window.location.href = "/admin"; 
}