import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard(){
    const [userStats,setuserStats]=useState([]);
    const [commentStats,setcommentStats]=useState([]);
    const [questionStats,setquestionStats]=useState([]);
    const [userCommentStats,setuserCommentStats]=useState([]);
    const [userReplyStats,setuserReplyStats]=useState([]);
    //get stats
    useEffect(() => {
      Axios.get('http://localhost:3001/api/admin/user_stats').then((response)=>{setuserStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_replies_stats').then((response)=>{setcommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_questions_stats').then((response)=>{setquestionStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_comments').then((response)=>{setuserCommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_replies').then((response)=>{setuserReplyStats(response.data)});
    } , [])
    if(localStorage.getItem("adminusername")){
     return(
       <>
        <div className="BackendPage">
            <h2 className="backend_title">Dashboard</h2><br/>
            <table className="dashboardtable">
              <tr>
                <td>
                  <div className="dashboardcard">
                  {userStats.map((val)=>{return (
                  <div>
                    <h1>Users</h1>
                    <h2>{val.Verified_Users} Verified Users</h2>
                    <h2>{val.Total_Users} Total Users</h2>
                    <Link to='/manage-users'>
                    <button className="backendbtn">Manage Users</button>
                    </Link>
                  </div>
                  )})}
                  </div>
                </td>
                <td>
                  <div className="dashboardcard">
                  {commentStats.map((val)=>{return (
                  <div>
                    <h1>Discussion</h1>
                    <h2>{val.Comments} Comments</h2>
                    <h2>{val.Replies} Replies</h2>
                    <Link to='/manage-discussion'>
                    <button className="backendbtn">Manage Discussion</button>
                    </Link>
                  </div>
                  )})}
                  </div>
                </td>
                <td>
                  <div className="dashboardcard">
                  {questionStats.map((val)=>{return (
                  <div>
                    <h1>Quiz</h1>
                    <h2>{val.Questions} Questions</h2>
                    <Link to='/manage-quiz'>
                    <button className="backendbtn">Manage Quiz Questions</button>
                    </Link>
                  </div>
                    )})}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="dashboardcard">
                  <h1>Most User Comments</h1>
                  <table id="listtable">
                    <tr>
                      <th>
                        Username
                      </th>
                      <th>
                        Comments
                      </th>
                    </tr>
                    {userCommentStats.map((val)=>{return (
                    <tr>
                      <td>
                        {val.Username}
                      </td>
                      <td>
                        {val.Comments}
                      </td>
                    </tr>
                    )})}
                  </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="dashboardcard">
                  <h1>Most User Replies</h1>
                  <table id="listtable">
                    <tr>
                      <th>
                        Username
                      </th>
                      <th>
                        Replies
                      </th>
                    </tr>
                    {userReplyStats.map((val)=>{return (
                    <tr>
                      <td>
                        {val.Username}
                      </td>
                      <td>
                        {val.Replies}
                      </td>
                    </tr>
                    )})}
                  </table>
                  </div>
                </td>
              </tr>
            </table>
        </div>  
        </>)
    }
    else window.location.href = "/admin"; 
}