import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import axios from 'axios'

// App
function App() {

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={Landing} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
