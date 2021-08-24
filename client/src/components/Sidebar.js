import React, { useState, useEffect } from 'react';
// import FlashMessage from 'react-flash-message'
import { Redirect, useHistory } from 'react-router-dom';
import {
  Twitter,
  Search,
  MailOutline,
  PersonOutline,
  MoreHorizRounded,
  HomeOutlined,
  Notifications,
} from '@material-ui/icons';
import {
  CropOriginal,
  InsertEmoticon,
  GifOutlined,
  Send,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import ShowSidebar from './ShowSidebar';
import axios from '../axios';
import './css/sidebar.css';
import '../App.css';

function Sidebar() {
  const [loggedout, setLoggedOut] = useState(false);
  const [messageText, setMessageText] = useState('');
  // const [user, setUser] = useState({ token: undefined, user: undefined });
  const [activeNavMessages, setActiveNavMessages] = useState(false);
  const [activeNavHome, setActiveNavHome] = useState(false);
  let date = new Date();
  let history = useHistory();

  const user = localStorage.getItem('t-user')
    ? JSON.parse(localStorage.getItem('t-user'))
    : [];
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (messageText === '') return null;
    let newData = {
      message: messageText,
      name: user.username,
      time: date.toLocaleTimeString(),
      currentDay: date.toDateString(),
    };
    axios
      .post('api/message/new', newData)
      .then((res) => {})
      .catch((err) => console.log(err));
    setMessageText('');
  };

  useEffect(() => {
    if (window.location.pathname === '/home') {
      setActiveNavHome(true);
      setActiveNavMessages(false);
    }
    if (window.location.pathname === '/messages') {
      setActiveNavHome(false);
      setActiveNavMessages(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('t-user');
    setLoggedOut(true);
  };
  return (
    <div className="sidebar messages__sidebar">
      {loggedout ? <Redirect to="/" /> : null}
      <div className="sidebar__container">
        {window.location.pathname === '/messages' ? (
          <div className="messageView__form">
            <CropOriginal className="icons" />
            <GifOutlined className="icons" />
            <form onSubmit={onSubmitHandler}>
              <div className="messageView__form__input">
                <input
                  type="text"
                  placeholder="Start a new message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <InsertEmoticon />
              </div>
              <button type="submit">
                <Send className="icons icon__send" />{' '}
              </button>
            </form>
          </div>
        ) : null}
        <div className="sidebar__icons">
          <Twitter
            onClick={() => history.push('/home')}
            className="sidebar__twitter"
          />
          <div onClick={() => history.push('/home')}>
            <ShowSidebar
              activeNavHome={activeNavHome}
              text="home"
              Icons={HomeOutlined}
            />{' '}
          </div>
          <ShowSidebar notAvailable text="explore" Icons={Search} />
          <ShowSidebar
            notAvailable
            text="notifications"
            Icons={Notifications}
          />

          <div onClick={() => history.push('/messages')}>
            <ShowSidebar
              activeNavMessages={activeNavMessages}
              text="messages"
              Icons={MailOutline}
            />{' '}
          </div>
          <ShowSidebar
            notAvailable
            displayNone
            text="profile"
            Icons={PersonOutline}
          />
          <ShowSidebar
            notAvailable
            displayNone
            text="more"
            Icons={MoreHorizRounded}
          />
        </div>
        <Button variant="outlined" fullWidth className="sidebar__btn">
          Tweet
        </Button>
        <div className="sidebar__user">
          <h3> {user.name} </h3>
          <Button
            className="sidebar__user__btn"
            onClick={logout}
            variant="outlined"
          >
            logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
