import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/login';
import Todo from './components/todo';
import Logout from './components/logout';
import Header from './components/header';
import Register from './components/register';

import GLOBALS from './config/constants';
import Edit from "./components/edit";
import Create from "./components/create";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/todo" component={Todo} />
          <Route path="/edit/:myid" component={Edit} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/create" component={Create} />
        </div>
      </Router>
    );
  }
}
 
function Home(){
  return '';
}
export default App;