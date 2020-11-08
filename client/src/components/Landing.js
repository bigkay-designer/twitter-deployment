import React, {useState} from 'react'
import {Redirect} from "react-router-dom";
import {Button} from '@material-ui/core'
import {Twitter} from '@material-ui/icons'
import axios from 'axios'
import {Link} from 'react-router-dom'

import './css/landing.css'
function Landing() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toHome, setToHome] = useState(false)

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        let newUser = {
            username: username,
            password:password,
        }
        axios.post('http://localhost:3001/login', newUser, {withCredentials:true})
        .then(res => {
            setToHome(true)
            res.send(res)
        })
        .catch(err => `error: ${err}`)

        setUsername('')
        setPassword('')
        
    }

    return (
        <div className="landing">
            {toHome ? <Redirect to='/home' /> : null }
            <div className="landing__main"></div>

            <div className="landing__aside">
                <div className="landing__login">
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)} />
                        <input type="password" placeholder="password"  value={password} onChange={e=> setPassword(e.target.value)} />
                        <div className="landing__login__btn">
                            <Button variant="outlined" fullWidth className="landing__login__btn" type="submit">Log in</Button>
                        </div>
                    </form>
                </div>
                <div className="landing__twitter">
                    <div className="landing__twitter__title">
                        <Twitter className="landing__twitter--icon" />
                        <h2>See what's happening in the world right now</h2>
                    </div>
                    <div className="landing__twitter__join">
                        <h3>Join Twitter today</h3>
                        <Link style={{textDecoration: 'none'}} to="/signup">
                            <Button variant="outlined" fullWidth className="landing__join__btn btn1">Sign up</Button>
                        </Link>
                        <Link style={{textDecoration: 'none'}}  to="/login">
                            <Button variant="outlined" fullWidth className="landing__join__btn btn2">Log in</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
