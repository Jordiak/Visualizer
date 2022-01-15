import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Graph from './components/pages/Graph';
import Queue from './components/pages/Queue';
import LinkedList from './components/pages/LinkedList';
import Tree from './components/pages/Tree';
import ShortestPath from './components/pages/ShortestPath';
import Sorting from './components/pages/Sorting';
import Dsa from './Dsa';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/sorting-algorithms" exact component={Sorting} />
        <Route path="/shortest-path-algorithms" exact component={ShortestPath} />
        <Route path="/unweighted-directed-graph" exact component={Graph} />
        <Route path="/data-structures" exact component={Dsa} />
        <Route path="/queue" exact component={Dsa} />
        <Route path="/linked-list" exact component={Dsa} />
        <Route path="/tree" exact component={Dsa} />
      </Switch>
    </Router>
  );
}

export default App;
