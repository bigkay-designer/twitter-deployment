import React from 'react'
import {Link} from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './css/messagePost.css'
function MessagePost() {
    return (
        <div className="messagePosts">
            <div className="posts__avatar">
                <Avatar src={'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png'} />
            </div>
            <div className="posts__header">
                <div className="posts__headerText">
                    <Link to="/messages/view">
                        <h3> group </h3>
                        <span className={`"posts__verified--none" }`}> <VerifiedUserIcon className="posts__verified" /> </span>  
                        <span className="span">@squaaad </span>
                    </Link>
                </div>
                {/* <div className="posts__description">
                    <span> {"text"} </span>
                </div> */}
            </div>
        </div>
    )
}

export default MessagePost
