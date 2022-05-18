import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { BiUser, BiCommentDetail, BiEdit  } from "react-icons/bi";
import { LineGraph } from "./DashboardGraphs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Dashboard(){
    //get regular stats
    const [userStats,setuserStats]=useState([]);
    const [commentStats,setcommentStats]=useState([]);
    const [questionStats,setquestionStats]=useState([]);
    const [userCommentStats,setuserCommentStats]=useState([]);
    const [userReplyStats,setuserReplyStats]=useState([]);
    const [userQuizStats,setuserQuizStats]=useState([]);

    //get line graph stats
    const [commentLineStats,setcommentLineStats]=useState([]);
    const [quizLineStats,setquizLineStats]=useState([]);
    const [usercreateLineStats,setusercreateLineStats]=useState([]);

    //get data from api
    useEffect(() => {
      Axios.get('http://localhost:3001/api/admin/user_stats').then((response)=>{setuserStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_replies_stats').then((response)=>{setcommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_line_stats').then((response)=>{setcommentLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_questions_stats').then((response)=>{setquestionStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_comments').then((response)=>{setuserCommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_replies').then((response)=>{setuserReplyStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_taker_stats').then((response)=>{setquizLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/new_user_stats').then((response)=>{setusercreateLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_quizzes').then((response)=>{setuserQuizStats(response.data)});
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
                    <span class="dashboardtitle">Users</span>
                    <table className="seperation">
                      <tr>
                        <td>
                        <h2 class="dashboardstats">{val.Verified_Users} Verified Users</h2>
                        <h2 class="dashboardstats">{val.Total_Users} Total Users</h2>
                        </td>
                        <td>
                        <h2 class="dashboardicon"><BiUser /></h2>
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
                        <td><h2 class="dashboardstats">{val.Comments} Comments</h2>
                        <h2 class="dashboardstats">{val.Replies} Replies</h2></td>
                        <td>
                        <h2 class="dashboardicon"><BiCommentDetail/></h2>  
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
                        <td>
                          <h2 class="dashboardstats">{val.Questions} Questions</h2>
                        <h2 class="dashboardstats">{val.QuizTakers} Quizzes Taken</h2>
                        </td>
                        <td><h2 class="dashboardicon"><BiEdit/></h2>
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
            <Tabs className="backendtabs" selectedTabClassName="backendtab--selected">
              <TabList className="backendtablist">
                <Tab className="backendtab"><span class="dashboardtitle">Demographic</span></Tab>
                <Tab className="backendtab"><span class="dashboardtitle">Analytics</span></Tab>
              </TabList>
            <TabPanel>
              
            </TabPanel>
            <TabPanel>
            <table className="dashboardtable">
           
              <tr>
                <td>       
            <div className="dashboardcard">
            <span class="dashboardtitle">Most User Comments</span>
            <table class="seperation">
              {userCommentStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Comments}</p></b></td>
                      </tr>
                    )})}
            </table>
                  </div>
                  <div className="dashboardcard">
            <span class="dashboardtitle">Most User Replies</span>
            <table class="seperation">
              {userReplyStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Replies}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>   
            <div className="dashboardcard">
            <span class="dashboardtitle">Top Scorers on Quizzes</span>
            <table class="seperation">
              {userQuizStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Score}/{val.Total}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>  
                </td>
                <td>
                <div className="dashboardcard">
              <span class="dashboardtitle">User Activity</span>
              <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                <TabList className="graphtablist">
                  <Tab className="graphtab"><strong>New Users</strong></Tab>
                  <Tab className="graphtab"><strong>Comments & Replies</strong></Tab>
                  <Tab className="graphtab"><strong>Quizzes Taken</strong></Tab>
              </TabList>
              <TabPanel>
                <LineGraph labels={usercreateLineStats.map(val => val.DateMade)} data1={usercreateLineStats.map(val => val.NewUsers)} label1={'New Users'} 
                label2={''} color1={'rgb(209, 23, 230, 0.60)'} color2={'rgb(0,0,0,0)'}/>
              </TabPanel>     
              <TabPanel>
                <LineGraph labels={commentLineStats.map(val => val.date_writtens)} data1={commentLineStats.map(val => val.Comments)} label1={'Comments'} 
                data2={commentLineStats.map(val => val.Replies)} label2={'Replies'} color1={'rgb(3, 94, 252, 0.60)'} color2={'rgb(252, 3, 94, 0.60)'}/>
              </TabPanel>
              <TabPanel>
              <LineGraph labels={quizLineStats.map(val => val.DateMade)} data1={quizLineStats.map(val => val.QuizTakers)} label1={'Quizzes Taken'}
                label2={''} color1={'rgb(38, 230, 0, 0.6)'} color2={'rgb(0,0,0,0)'}/>
              </TabPanel>
              </Tabs>      
                </div>
                </td>
              </tr>
            </table>
            </TabPanel>
            </Tabs>
        </div>  
        </>
        )
    }
    else window.location.href = "/admin";
}