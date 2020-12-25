import React, {useEffect, useState} from 'react'
import Pusher from 'pusher-js'
import axios from '../../axios'
import {Button} from '@material-ui/core'
import { Avatar } from '@material-ui/core';
import { CropOriginal, InsertEmoticon, GifOutlined, Send, DeleteOutline} from '@material-ui/icons';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import './css/messagesView.css'
function MessageView() {
    const [message, setMessage] = useState([])
    const [messageText, setMessageText] = useState('')
    const [removeMessage, setRemoveMessage] = useState(true)
    const [user, setUser] = useState({token: undefined, user: undefined})
    const [formNone, setFormNone] = useState(true)


    useEffect(()=>{
        axios.get('/api/message')
        .then(data=>{
            let newMessage = data.data
            setMessage(newMessage)
        })

    }, [removeMessage])

    useEffect(()=>{
        const pusher = new Pusher('f9ff0c0b6cf24f35ed0d', {
          cluster: 'eu'
        });
    
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
          setMessage([...message, data])
        });
        channel.bind('deleted', removeMessage)

        return () =>{
            channel.unbind_all()
            channel.unsubscribe()
        }
      }, [message])

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

    const deleteMessageHandler = (e, messageId) =>{
        setRemoveMessage(message.filter(el => el.id !== messageId))
        axios.delete(`/api/message/${messageId}`)
        .then(res =>{
        })
        .catch(err => console.log(err))

        axios.get('/api/message')
        .then(data => {
            // let message = data.data
        })
    }
    
    return (
        <div className="messageView">
            <div className="messageView__defualt">
                <h2>You don't have a message selected </h2>
                <p>Choose one from your existing messages, or start a new one.</p>
                <Button className="messageView__btn">new message</Button>
            </div>
            <div className="messageView__header">
                <div className="posts__avatar">
                    <Avatar src={'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png'} />
                </div>
                <div className="posts__header">
                    <div className="posts__headerText">
                        <h3> group </h3>
                        <span className={`"posts__verified--none" }`}> <VerifiedUserIcon className="posts__verified" /> </span>  
                        <span className="span">@squaaad </span>
                        
                    </div>
                </div>
            </div>
            <div className="messageView__body">  
                {message.map(text=>(
                    <div className={`messageView__content ${user.username === text.name && "message__reciever" }`}>
                        <div className="message__header__container">
                            <div className="messageView__content__avatar">
                                <Avatar src={'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png'} />
                            </div>
                            <div className="messageView__content__body">
                                <div className="content__bodyText">
                                    
                                    <h3> {text.name} </h3>
                                    <p> {text.message} </p>
                                </div>
                                {user.username === text.name ?
                                    <DeleteOutline className="content__delete" onClick={(e) => deleteMessageHandler(e, text._id)} />
                                    : null
                                }
                                <h4 className="content__timestamp"> {new Date().toUTCString()} </h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


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
        </div>
    )
}

export default MessageView
