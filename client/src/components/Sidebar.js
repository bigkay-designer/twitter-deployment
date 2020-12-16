import React, {useState, useEffect} from 'react'
// import FlashMessage from 'react-flash-message'
import {Redirect, Link} from "react-router-dom";
import {Twitter, Search, MailOutline, PersonOutline, MoreHorizRounded, HomeOutlined, Notifications} from '@material-ui/icons';
import {Button} from '@material-ui/core'
import ShowSidebar from './ShowSidebar'
import axios from '../axios'
import './css/sidebar.css'
import '../App.css'

function Sidebar() {
    const [loggedout, setLoggedOut] = useState(false)
    const [name, setName] = useState('')

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


    const logout = ()=>{
       localStorage.removeItem("token")
       setLoggedOut(true)
    }
    return (
        <div className="sidebar">
            {loggedout ? <Redirect to='/' /> : null }
            <div className="sidebar__container">
                <Twitter className="sidebar__twitter" />
                <Link to="/home"> <ShowSidebar active text="home" Icons={HomeOutlined} /> </Link>
                <ShowSidebar notAvailable  text="explore" Icons={Search} />
                <ShowSidebar notAvailable text="notifications" Icons={Notifications} />

                <Link to="/messages"> <ShowSidebar text="messages" Icons={MailOutline} /> </Link>
                <ShowSidebar notAvailable displayNone text="profile" Icons={PersonOutline} />
                <ShowSidebar notAvailable displayNone text="more" Icons={MoreHorizRounded} />
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
