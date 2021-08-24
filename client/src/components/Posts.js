import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {
  ChatBubbleOutline,
  FavoriteBorder,
  DeleteOutline,
  Repeat,
  Favorite,
} from '@material-ui/icons';
import './css/posts.css';
function Posts({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  deletePost,
  currentuser,
  hidePost,
}) {
  const [postLiked, setPostLiked] = useState(false);
  return (
    <div className={`posts`}>
      <div className="posts__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="posts__body">
        <div className="posts__header">
          <div className="posts__headerText">
            <h3>{displayName} </h3>
            <span className={`${!verified && 'posts__verified--none'}`}>
              {' '}
              <VerifiedUserIcon className="posts__verified" />{' '}
            </span>
            <span className="span">@{username} </span>
          </div>
          <div className="posts__description">
            <p> {text} </p>
          </div>
        </div>
        {image ? <img src={image} alt="gif" /> : null}

        <div className="posts__icons">
          <ChatBubbleOutline className="showSidebar__notAvailable" />
          <Repeat className="showSidebar__notAvailable" />
          <span onClick={() => setPostLiked(!postLiked)}>
            {postLiked ? (
              <Favorite className={`${postLiked && 'heartRed'}`} />
            ) : (
              <FavoriteBorder />
            )}
          </span>
          {currentuser === username ? (
            <span onClick={deletePost}>
              {' '}
              <DeleteOutline />{' '}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Posts;
