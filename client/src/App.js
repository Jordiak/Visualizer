import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavbarBackend from './components/NavbarBackend';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import ShortestPath from './components/pages/ShortestPath';
import Sorting from './components/pages/Sorting';
import Dsa from './components/pages/Dsa';
import DataStructures from './components/pages/DataStructures';
import Information from './components/pages/Information';
import LoginForm from './components/pages/LoginForm';
import { UserContext } from './components/UserContext';
import Comment from './components/pages/comment';
import Admin from './components/pages/Admin';
import ManageUsers from './components/pages/ManageUsers';
import ManageDiscussion from './components/pages/ManageDiscussion';
import Quiz from './components/pages/quiz';
import ManageQuiz from './components/pages/ManageQuiz';
import Dashboard from './components/pages/Dashboard';
import AVL from './components/AVL_Tree/AVL';
import ScorePage from './components/pages/ScorePage';
import Profile from './components/pages/Profile';
import RegisterForm from './components/pages/RegisterForm';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';

function App() {
  //Login/Register with Dropdown
  const [value, setValue] = useState(<>
            <li className='nav-item'>
          <input id="check01" type="checkbox" name="menu" className="dropdowninput"/>
          <label for="check01"><span className="nav-links">
            <span className="navbicon"><BiUser/> </span>
          Login</span></label>
          <ul class="submenu">
          <li>Log in or Register to join our discussion board and to take the daily quiz!</li>
          <br/>
            <li><Link to='/login-form' className='nav-links'>
            Login
            </Link></li>
            <br/>
            <li><Link to='/register-form' className='nav-links'>
            
            Register
            </Link></li>
          </ul>
          </li>
  </>)
  
  if(window.location.pathname=="/admin"){
    return (
      <Router>
        <UserContext.Provider value={{value,setValue}}>
        <Switch>
        <Route path="/admin" exact component={Admin} />
        </Switch>
        </UserContext.Provider>
      </Router>  
    );
  }
  else if(window.location.pathname=="/manage-users" || window.location.pathname=="/manage-discussion"
  || window.location.pathname=="/dashboard" || window.location.pathname=="/manage-quiz"){
    return (
      <Router>
      <UserContext.Provider value={{value,setValue}}>
        <NavbarBackend />
        <Switch>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/manage-quiz" exact component={ManageQuiz}/>
        <Route path="/manage-users" exact component={ManageUsers} />
        <Route path="/manage-discussion" exact component={ManageDiscussion} />
        </Switch>
        </UserContext.Provider>
      </Router>  
    );
  }
  return (
    <Router>
      <UserContext.Provider value={{value,setValue}}>
      <Navbar />
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/information" exact component={Information}/>
        <Route path="/sorting-algorithms" exact component={Sorting} />
        <Route path="/shortest-path-algorithms" exact component={ShortestPath} />
        <Route path="/data-structures" exact component={DataStructures} />
        <Route path="/login-form" exact component={LoginForm} />
        <Route path="/login-form/:id" exact component={LoginForm} />
        <Route path="/register-form" exact component={RegisterForm} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/Quiz" exact component={Quiz}/>
        <Route path="/comments" exact component={Comment} />
        <Route path='/AVL' exact component={AVL} />
        <Route path='/score-page' exact component={ScorePage} />
      </Switch>
    
      <Footer />
      </UserContext.Provider>
  
    </Router> 
  );
}

export default App;
