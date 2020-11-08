import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import {Cancel} from '@material-ui/icons'
import Landing from '../Landing'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './auth.css'
function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmitHandler = (e)=>{
        e.preventDefault();

        let newUser = {
            username: username,
            email: email,
            password:password,
            name: name,
            verified: true
        }
        axios.post('http://localhost:3001/signup', newUser)
        .then(res => {
            console.log(res.data)
            res.send(res.data)
        })
        .catch(err => `error: ${err}`)

        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
    }
    return (
        <div className="signup">
            <Landing className="signup__landing" />
            <div className="signup__main">
                <Link className="cancel__link" to="/">
                    <span > <Cancel className="signup__main__cancel" /> </span> 
                </Link>
                <div className="signup__tittle">
                    <h2>Create your account</h2>
                </div>
                <div className="signup__form">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form__div">
                            <label htmlFor="name">name</label>
                            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form__div">
                            <label htmlFor="email">email</label>
                            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form__div">
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="form__div">
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <Button variant="outlined" fullWidth className="signup__btn" type="submit">Sign up</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
