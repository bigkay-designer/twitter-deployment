import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Pusher from 'pusher-js'
import Home from './components/Home'
import Landing from './components/Landing'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Messages from './components/messages/Message'
import axios from './axios'


// App
function App() {
  const [messages, setMessages] = useState([])
  useEffect(()=>{
    axios.get('api/messages')
    .then(res =>{
      setMessages(res.data)
    })
  }, [])

  useEffect(()=>{
    const pusher = new Pusher('f9ff0c0b6cf24f35ed0d', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
      setMessages([...messages, data])
    });
  }, [messages])

  return (
    <Router>
        {/* <FileUpload /> */}
      <div className="app">
        <Switch>
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