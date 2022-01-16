import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import ShortestPath from './components/pages/ShortestPath';
import Sorting from './components/pages/Sorting';
import Dsa from './components/pages/Dsa';
import DataStructures from './components/pages/DataStructures';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/sorting-algorithms" exact component={Sorting} />
        <Route path="/shortest-path-algorithms" exact component={ShortestPath} />
        <Route path="/data-structures" exact component={DataStructures} />
      </Switch>
    </Router>
  );
}

export default App;
