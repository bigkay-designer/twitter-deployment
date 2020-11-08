import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom";
import {Twitter, Search, MailOutline, PersonOutline, MoreHorizRounded, HomeOutlined, Notifications} from '@material-ui/icons';
import {Button} from '@material-ui/core'
import ShowSidebar from './ShowSidebar'
import axios from 'axios'
import './css/sidebar.css'
import '../App.css'

function Sidebar() {
    const [loggedout, setLoggedOut] = useState(false)
    const [name, setName] = useState('')

    useEffect(()=>{
        axios({
            method:'GET',
            withCredentials: true,
            url:"http://localhost:3001/user"
        })
        .then(res => {
            setName(res.data.name)
        })
    }, [])


    const logout = ()=>{
        axios({
            method:'GET',
            withCredentials: true,
            url:"http://localhost:3001/logout"
        })
        .then(res => {
            setLoggedOut(true)
        })
    }
    return (
        <div className="sidebar">
            {loggedout ? <Redirect to='/' /> : null }
            <div className="sidebar__container">
                <Twitter className="sidebar__twitter" />
                <ShowSidebar active text="home" Icons={HomeOutlined} />
                <ShowSidebar  text="explore" Icons={Search} />
                <ShowSidebar text="notifications" Icons={Notifications} />
                <ShowSidebar text="messages" Icons={MailOutline} />
                <ShowSidebar displayNone text="profile" Icons={PersonOutline} />
                <ShowSidebar displayNone text="more" Icons={MoreHorizRounded} />
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
