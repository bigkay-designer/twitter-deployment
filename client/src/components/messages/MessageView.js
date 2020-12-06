import React from 'react'
import {Button} from '@material-ui/core'
import { Avatar } from '@material-ui/core';
import {CropOriginal, InsertEmoticon, GifOutlined, Send} from '@material-ui/icons';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import './css/messagesView.css'
function MessageView() {
    return (
        <div className="messageView">
            <div className="messageView__defualt">
                <h2>You don't have a message selected </h2>
                <p>Choose one from your existing messages, or start a new one.</p>
                <Button className="messageView__btn">new message</Button>
            </div>
            <div className="messageView">
                <div className="posts__avatar">
                    <Avatar src={'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png'} />
                </div>
                <div className="posts__header">
                    <div className="posts__headerText">
                        <h3> abdi </h3>
                        <span className={`"posts__verified--none" }`}> <VerifiedUserIcon className="posts__verified" /> </span>  
                        <span className="span">@abdi__123 </span>
                        
                    </div>
                    <div className="posts__description">
                        <span> {"text"} </span>
                    </div>
                </div>
            </div>
            <div className="messageView__form">
                <CropOriginal className="icons" />
                <GifOutlined className="icons" />
                <form>
                    <input type="text" placeholder="Start a new message" />
                    <InsertEmoticon />
                </form>
                <Send className="icons icon__send" />
            </div>
        </div>
    )
}

export default MessageView
