import React from 'react'
import Sidebar from '../Sidebar'
import MessageFeed from './MessageFeed'
import MessageView from './MessageView'
import '../../App.css'
function Message() {
    return (
        <div className="messages App">
            {/* nav */}
            <Sidebar />
            {/* message */}
            <MessageFeed/>
            {/* view messages */}
            <MessageView />
        </div>
    )
}

export default Message
