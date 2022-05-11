import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { BiUser, BiCommentDetail, BiEdit  } from "react-icons/bi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(){
  //get stats
    const [userStats,setuserStats]=useState([]);
    const [commentStats,setcommentStats]=useState([]);
    const [commentLineStats,setcommentLineStats]=useState([]);
    const [questionStats,setquestionStats]=useState([]);
    const [userCommentStats,setuserCommentStats]=useState([]);
    const [userReplyStats,setuserReplyStats]=useState([]);
    useEffect(() => {
      Axios.get('http://localhost:3001/api/admin/user_stats').then((response)=>{setuserStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_replies_stats').then((response)=>{setcommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_line_stats').then((response)=>{setcommentLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_questions_stats').then((response)=>{setquestionStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_comments').then((response)=>{setuserCommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_replies').then((response)=>{setuserReplyStats(response.data)});
    } , [])
    const data = {
      labels: commentLineStats.map(val => val.date_writtens),
      datasets: [
        {
          label: 'Comments',
          data: commentLineStats.map(val => val.Comments),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Replies',
          data: commentLineStats.map(val => val.Replies),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        maintainAspectRatio: false,
        title: {
          display: false,
          text: 'Comments Made',
        },
      },
    };
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
                    <span class="dashboardtitle">Users</span>
                    <table className="seperation">
                      <tr>
                        <td>
                        <span class="dashboardicon"><BiUser /></span>
                        </td>
                        <td>
                        <h2 class="dashboardstats">{val.Verified_Users} Verified Users</h2>
                        <h2 class="dashboardstats">{val.Total_Users} Total Users</h2>
                        </td>
                      </tr>
                    </table>
                    
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
                    <span class="dashboardtitle">Discussion</span>
                    <table className="seperation">
                      <tr>
                        <td><span class="dashboardicon"><BiCommentDetail/></span></td>
                        <td>
                        <h2 class="dashboardstats">{val.Comments} Comments</h2>
                        <h2 class="dashboardstats">{val.Replies} Replies</h2>
                        </td>
                      </tr>
                      </table>
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
                    <span class="dashboardtitle">Quiz</span>
                    <table className="seperation">
                      <tr>
                        <td><span class="dashboardicon"><BiEdit/></span></td>
                        <td>
                        <h2 class="dashboardstats">{val.Questions} Questions</h2>
                        <h2 class="dashboardstats">{val.Questions} Questions</h2>
                        </td>
                      </tr>
                    </table>
                    <Link to='/manage-quiz'>
                    <button className="backendbtn">Manage Quiz</button>
                    </Link>
                  </div>
                    )})}
                  </div>
                </td>
              </tr>
            </table>
            <span class="dashboardtitle">Performance</span>
            <table>
              <tr>
                <td>
                <div className="dashboardcard">
            <span class="dashboardtitle">Most User Replies</span>
            <table class="seperation">
              {userReplyStats.map((val)=>{return (
                      <tr>
                        <td><b>{val.Username}</b></td>
                        <td>{val.Replies} Replies</td>
                      </tr>
                    )})}
            </table>
            </div>      
            <div className="dashboardcard">
            <span class="dashboardtitle">Most User Comments</span>
            <table class="seperation">
              {userCommentStats.map((val)=>{return (
                      <tr>
                        <td><b>{val.Username}</b></td>
                        <td>{val.Comments} Comments</td>
                      </tr>
                    )})}
            </table>
                  </div>
                </td>
                <td>
                <div className="dashboardcard">
              <span class="dashboardtitle">User Activity</span>
                <Line options={options} data={data}/>
                </div>
                </td>
              </tr>
            </table>
        </div>  
        </>)
    }
    else window.location.href = "/admin"; 
}