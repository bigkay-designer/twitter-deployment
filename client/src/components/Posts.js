import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {ChatBubbleOutline,Favorite,FavoriteBorder, DeleteOutline , Repeat} from '@material-ui/icons'
import './css/posts.css'
function Posts( {displayName,username,verified,text,image,avatar, keys, deletePost, currentuser}) {
    
    const [likePost, setLikePost] = useState([])
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [postLikes, setPostLikes] = useState('')

    let likedUsers = ['']

    const likePostHandler = (e) => {
        e.preventDefault();

        likedUsers.map(likes=>{
                
            if(likes === currentuser){
                const indexOfUser = likedUsers.indexOf(currentuser)
                likedUsers.splice(indexOfUser,1)
                console.log('yay')
                return setIsPostLiked(false)
            }else{
                likedUsers.splice(0,0, currentuser)
                setPostLikes(likedUsers.length)
                return setIsPostLiked(true)
            }
        })
        console.log(likedUsers)
    }
    return (
        <div className="posts"  key={keys}>
            <div className="posts__avatar">
                <Avatar src={avatar} />
            </div>
            <div className="posts__body">
                <div className="posts__header">
                    <div className="posts__headerText">
                        <h3>{displayName} </h3>
                        <span className={`${!verified && "posts__verified--none" }`}> <VerifiedUserIcon className="posts__verified" /> </span>  
                        <span className="span">@{username} </span>
                        
                    </div>
                    <div className="posts__description">
                        <span> {text} </span>
                    </div>
                </div>
                {image ? <img src={image} alt="gif"/> : null }

                <div className="posts__icons">
                    <ChatBubbleOutline />
                    <Repeat />
                    {isPostLiked ? 
                       <span onClick={likePostHandler}> <Favorite className='heartRed' /> </span> 
                    :  <span onClick={likePostHandler}> <FavoriteBorder /></span>
                    }
                    
                    {currentuser === username ?  
                        <span onClick={deletePost}> <DeleteOutline /> </span>
                    :null }
                </div>
            </div>
        </div>
    )
}

export default Posts
