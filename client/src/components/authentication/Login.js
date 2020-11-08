import React, {useState} from 'react'
import {Redirect} from "react-router-dom";

import {Button} from '@material-ui/core'
import {Cancel} from '@material-ui/icons'
import Landing from '../Landing'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './auth.css'
function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toHome, setToHome] = useState(false)

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        let newUser = {
            username: username,
            password:password,
        }
        axios.post('/login', newUser, {withCredentials:true})
        .then(res => {
            setToHome(true)
            res.send(res)
        })
        .catch(err => `error: ${err}`)

        setUsername('')
        setPassword('')
        
    }

    return (
        
        <div className="signup">
            {toHome ? <Redirect to='/home' /> : null }
            <Landing className="signup__landing" />
            <div className="signup__main">
                <Link className="cancel__link" to="/">
                    <span > <Cancel className="signup__main__cancel" /> </span> 
                </Link>
                <div className="signup__tittle">
                    <h2>Login to your account</h2>
                </div>
                <div className="signup__form">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form__div">
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="form__div">
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} required />
                        </div>
                        <Button variant="outlined" fullWidth className="signup__btn" type="submit">log in</Button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
