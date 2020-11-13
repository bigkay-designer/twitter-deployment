import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'

// App
function App() {

  // useEffect(()=>{
  //   const isLoggedIn = async () =>{
  //     let token = localStorage.getItem("auth-token")
  //     if(token === null){
  //       localStorage.setItem ("auth-token", "")
  //     }
  //     token = ""
  //     const tokenResponse = await
  //     axios.post('http://localhost:5000/api/tokenIsValid', null , {headers: {"auth-token": token}});
  //     if(tokenResponse.data){
  //       const userRes = await axios.get('http://localhost:5000/api/', {
  //         headers: {"auth-token": token}
  //       });
  //       setUserData({token, user: userRes.data});
  //     }
  //   }
  //   isLoggedIn()
  // }, [])
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
