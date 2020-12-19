import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
// import { Avatar } from '@material-ui/core';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MessagePost from './MessagePost'
import './css/messagesFeed.css'
function MessageFeed() {
    return (
        <div className="messageFeed">
            <div className="messageFeed__title">
                <h1>Messages</h1>
            </div>
            <div className="messagesFeed__search">
                <form >
                    <SearchIcon className="messagesFeed__searchIcon" />
                    <input type="text" placeholder="search for people and groups" />
                </form>
            </div>

            <MessagePost />
        </div>
    )
}

export default MessageFeed
