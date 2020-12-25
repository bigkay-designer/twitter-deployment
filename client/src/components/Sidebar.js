import React, {useState, useEffect} from 'react'
// import FlashMessage from 'react-flash-message'
import {Redirect, Link} from "react-router-dom";
import {Twitter, Search, MailOutline, PersonOutline, MoreHorizRounded, HomeOutlined, Notifications} from '@material-ui/icons';
import {CropOriginal, InsertEmoticon, GifOutlined, Send, DeleteOutline} from '@material-ui/icons';
import {Button} from '@material-ui/core'
import ShowSidebar from './ShowSidebar'
import axios from '../axios'
import './css/sidebar.css'
import '../App.css'

function Sidebar() {
    const [loggedout, setLoggedOut] = useState(false)
    const [name, setName] = useState('')
    const [messageText, setMessageText] = useState('')
    const [user, setUser] = useState({token: undefined, user: undefined})

    useEffect(()=>{
        axios({
            method:'GET',
            url:"/api/",
            headers: {"auth-token": localStorage.getItem("token")}
        })
        .then(res => {
            setName(res.data.name)
            // setErrorMessage(true)
            // window.setTimeout(()=>{
            //     setErrorMessage(false)
            // }, 5000)
        })
    }, [])

    useEffect(()=>{
        axios.get('/api', {headers: {"auth-token": localStorage.getItem("token")}
        })
        .then(res => {
            setUser(res.data)
        })
        .catch(err => console.log(`error ${err}`))
    }, [])
    
    const onSubmitHandler =  (e)=>{
        e.preventDefault()
        let newData = {
            message: messageText,
            name: user.username,
            time: '10:20'
        }

        axios.post('api/message/new', newData)
        .then(res=>{
            // console.log(res)
        })
        .catch(err => console.log(err))
        
        axios.get('/api/message')
        .then(data => {
            // let message = data.data
        })
        setMessageText('')
    }

    const logout = ()=>{
       localStorage.removeItem("token")
       setLoggedOut(true)
    }
    return (
        <div className="sidebar messages__sidebar">
            {loggedout ? <Redirect to='/' /> : null }
            <div className="sidebar__container">
                {window.location.pathname === '/messages' ? 
                    <div className="messageView__form">
                        <CropOriginal className="icons" />
                        <GifOutlined className="icons" />
                        <form onSubmit={onSubmitHandler}>
                            <div className="messageView__form__input">
                                <input type="text" placeholder="Start a new message" value={messageText} onChange={(e)=> setMessageText(e.target.value)} />
                                <InsertEmoticon />
                            </div>
                            <button type="submit"><Send className="icons icon__send" /> </button>
                        </form>
                    </div>
                : null
                }
                <div className="sidebar__icons">
                    <Twitter className="sidebar__twitter" />
                    <Link to="/home"> <ShowSidebar active text="home" Icons={HomeOutlined} /> </Link>
                    <ShowSidebar notAvailable  text="explore" Icons={Search} />
                    <ShowSidebar notAvailable text="notifications" Icons={Notifications} />

                    <Link to="/messages"> <ShowSidebar text="messages" Icons={MailOutline} /> </Link>
                    <ShowSidebar notAvailable displayNone text="profile" Icons={PersonOutline} />
                    <ShowSidebar notAvailable displayNone text="more" Icons={MoreHorizRounded} />
                </div>
                <Button variant="outlined" fullWidth className="sidebar__btn">Tweet</Button>
                <div className="sidebar__user">
                    <h3> {name} </h3>
                    <Button className="sidebar__user__btn" onClick={logout} variant="outlined" >logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
