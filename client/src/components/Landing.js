import React, {useState, useEffect} from 'react'
import FlashMessage from 'react-flash-message'
import {Redirect} from "react-router-dom";
import {Button} from '@material-ui/core'
import {Twitter} from '@material-ui/icons'
import axios from '../axios'
import {Link} from 'react-router-dom'

import './css/landing.css'
function Landing() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toHome, setToHome] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [landingPopup, setLandingPopup] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLandingPopup(false)
        }, 2000);
    }, [])

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        let newUser = {username, password}
        // const loginResponse = await 
        axios.post('/api/login', newUser)
        .then(res => {
            setToHome(true)
            localStorage.setItem("token", res.data.token);
        })
        .catch(err => {
            setErrorMessage(true)
            window.setTimeout(()=>{
                setErrorMessage(false)
            }, 5000)
        })

        setUsername('')
        setPassword('')
        
    }

    return (
        <div className="landing">
            {toHome ? <Redirect to='/home' /> : null }
            <div className={`${landingPopup ? "landing__popup": "landing__popup--none"}`}>
                <Twitter className="landing__popup__icon" />
            </div>
            <div className="landing__container">
                <div className="landing__main"></div>
                <div className="landing__aside">
                    <div className="landing__login">
                        <form onSubmit={onSubmitHandler}>
                            <input type="text" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)} required />
                            <input type="password" placeholder="password"  value={password} onChange={e=> setPassword(e.target.value)} required />
                            <div className="landing__login__btn">
                                <Button variant="outlined" fullWidth className="landing__login__btn" type="submit">Log in</Button>
                            </div>
                        </form>
                        {errorMessage &&
                                <FlashMessage duration={5000} persistOnHover = {true}>
                                    <h3 className="error">No account with this username has been found.</h3>
                                </FlashMessage>
                        }
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
        </div>
    )
}

export default Landing
