import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import {Button} from '@material-ui/core'
import {Cancel} from '@material-ui/icons'
import Landing from '../Landing'
import {Link} from 'react-router-dom'
import axios from '../../axios'
import '../../App.css'
import './auth.css'
function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessagePassword, setErrorMessagePassword] = useState(false)
    const [errorMessageEmail, setErrorMessageEmail] = useState(false)
    const [successSignup, setSuccessSignup] = useState(false)
    const [redirect, setRedirect] = useState(false)
        
    const onSubmitHandler = (e)=>{
        e.preventDefault();

        let newUser = {
            username: username,
            email: email,
            password:password,
            name: name,
            verified: true
        }
        axios.post('/api/signup', newUser)
        .then(res => {
            setSuccessSignup(true)
            window.setTimeout(()=>{
                setRedirect(true)
                setSuccessSignup(false)
            }, 5000)
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
        })
        .catch(err =>{
            if(password.length < 6){
                setErrorMessagePassword(true)
                window.setTimeout(()=>{
                    setErrorMessagePassword(false)
                }, 5000)
                setPassword('')
            }
            axios.get('api/user')
            .then(res =>{
                const users = res.data
                users.map(user=>{
                   if(user.email === email){
                        setErrorMessageEmail(true)
                        window.setTimeout(()=>{
                            setErrorMessageEmail(false)
                        }, 5000)
                        setEmail('')
                   }
                })
                setPassword('')
            })
            .catch(err => console.log(err))
        })

    }
    return (
        <div className="signup">
            <Landing className="signup__landing" />
            <div className="signup__main">
                {successSignup &&
                    <FlashMessage duration={5000} persistOnHover={true}>
                        <h3 className="success"> Successfully registered,  now you can login with your account</h3> 
                    </FlashMessage>
                }
                {redirect &&
                    <Redirect to={'/login'} />
                }

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
                            {errorMessageEmail &&
                                <FlashMessage duration={5000} persistOnHover={true}>
                                    <h3 className="error"> An account with this email already exists.</h3> 
                                </FlashMessage>
                            }
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
                    {errorMessagePassword &&
                            <FlashMessage duration={5000} persistOnHover = {true}>
                                <h3 className="error">The password needs to be at least 6 characters long.</h3>
                            </FlashMessage>
                    }
                </div>
            </div>
        </div>
    )
}

export default Signup
