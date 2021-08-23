import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import Messages from './components/messages/Message';
import MessageViewSmall from './components/messages/MessageViewSmall';
import axios from './axios';

// App
function App() {
  const user = localStorage.getItem('t-user')
    ? JSON.parse(localStorage.getItem('t-user'))
    : [];
  const fetchUser = async () => {
    await axios
      .get('/api', { headers: { 'auth-token': localStorage.getItem('token') } })
      .then((res) => {})
      .catch((err) => console.log(`error ${err}`));
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      {/* <FileUpload /> */}
      <div className="app">
        {user.length === 0 ? <Redirect to="/" /> : null}
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
