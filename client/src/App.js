import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Messages from './components/messages/Message'
import MessageViewSmall from './components/messages/MessageViewSmall'


// App
function App() {

  return (
    <Router>
        {/* <FileUpload /> */}
      <div className="app">
        <Switch>
          <Route path="/messages/view" component={MessageViewSmall} />
          <Route path="/messages" component={Messages} />
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