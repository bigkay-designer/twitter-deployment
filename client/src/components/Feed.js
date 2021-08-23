import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../axios';
import './css/feed.css';
import { Button } from '@material-ui/core';
import {
  StarOutlined,
  CropOriginal,
  AccountCircle,
  Cancel,
} from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Posts from './Posts';

function Feed() {
  const [userPost, setUserPost] = useState([]);
  const [postAdded, setPostAdded] = useState(false);
  // const [user, setUser] = useState({ token: undefined, user: undefined });
  const [tweetText, setTweetText] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  const [linkTweetImage, setLinkTweetImage] = useState('');
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [loggedout, setLoggedOut] = useState(false);
  const [tweetBox, setTweetBox] = useState(false);
  const [disbaleTweetBtn, setDisableTweetBtn] = useState(true);

  const user = localStorage.getItem('t-user')
    ? JSON.parse(localStorage.getItem('t-user'))
    : [];

  const fetchPosts = async () => {
    await axios
      .get('/api/post')
      .then((data) => {
        const newPost = data.data;
        setUserPost(newPost);
      })
      .catch((err) => console.log(`error ${err}`));
  };
  useEffect(() => {
    fetchPosts();
  }, [postAdded]);

  const deletePostHandler = async (e, dataId) => {
    e.preventDefault();
    await axios
      .delete(`/api/post/posts/${dataId}`)
      .then((posts) => {
        setPostAdded(!postAdded);
      })
      .catch((err) => console.log(`error ${err}`));
  };

  const tweetTextHandler = (e) => {
    setTweetText(e.target.value);
    setDisableTweetBtn(false);
  };

  const closeTweetImgHandler = () => {
    setTweetImage('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (tweetText === '') return null;
    const newPost = {
      displayName: user.name,
      username: user.username,
      text: tweetText,
      image: linkTweetImage,
      avatar:
        'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png',
      author: {
        id: user.id,
        name: user.name,
      },
    };
    axios
      .post('/api/post/posts', newPost)
      .then((res) => {
        setPostAdded(!postAdded);
      })
      .catch((err) => console.log(`error ${err.message}`));
    setTweetImage('');
    setTweetText('');
    setLinkTweetImage('');
    setShowLinkBox(false);
    setTweetBox(false);
  };

  const tweetImageBg = {
    background: `url(${tweetImage}) center center / cover no-repeat`,
    width: '100%',
    height: '300px',
    marginBottom: '20px',
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('t-user');
    setLoggedOut(true);
  };

  const tweetBoxHandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      window.scrollTo(0, 0);
      setTweetBox(true);
    }, 10);
  };
  const redirectHomeHandler = (e) => {
    e.preventDefault();
    setTweetBox(false);
  };

  return (
    <div className="feed">
      {loggedout ? <Redirect to="/" /> : null}
      <div className="feed__container">
        <form onSubmit={submitHandler}>
          <div className="feed__title">
            <div className="feed__user">
              <Button
                className="feed__user__btn"
                onClick={logout}
                variant="outlined"
              >
                logout
              </Button>
            </div>
            <h1>home</h1>
            <StarOutlined className="feed__title--icon" />
          </div>
          <div
            className={`feed__tweet ${tweetBox ? 'feed__tweet__popup' : null}`}
          >
            <div className="feed__tweet__cancle">
              <h3 onClick={redirectHomeHandler}>Cancel</h3>
            </div>
            <div className="feed__tweet__title">
              <AccountCircle className="tweet__icon" />
              <textarea
                className="feed__input"
                type="text"
                value={tweetText}
                placeholder="what's happeing?"
                onChange={tweetTextHandler}
                cols="30"
                rows="3"
              ></textarea>
            </div>
            {tweetImage ? (
              <div style={tweetImageBg} className="feed__imageFile">
                <span onClick={closeTweetImgHandler}>
                  {' '}
                  <Cancel className="feed__imageFile--close" />{' '}
                </span>
              </div>
            ) : null}
            <div className="feed__tweet__attachment">
              <input
                className={`feed__tweet__input  ${
                  showLinkBox && 'feed__tweet__input--show'
                }`}
                type="text"
                id="file"
                placeholder="paste the URL here"
                onChange={(e) => setLinkTweetImage(e.target.value)}
                value={linkTweetImage}
              />
              <label htmlFor="file" onClick={() => setShowLinkBox(true)}>
                <CropOriginal className="tweet__attachment__icon" />{' '}
              </label>
            </div>
            <div className="feed__tweet__attachment__icons">
              {/* <GifOutlined` className="tweet__attachment__icon gif" />
                            <InsertEmoticon className="tweet__attachment__icon" />
                            <Schedule cl`assName="tweet__attachment__icon" />  */}
            </div>

            <div
              className={`feed__tweet__div ${
                disbaleTweetBtn && 'disable__btn'
              }`}
            >
              <Button
                className="feed__tweet__btn"
                variant="outlined"
                type="submit"
              >
                tweet
              </Button>
            </div>
          </div>
          {/* ************************************************************************** */}
          {userPost.map((data) => (
            <div className="feed__posts" key={data._id}>
              <Posts
                displayName={data.displayName}
                username={data.username}
                text={data.text}
                image={data.image}
                verified={data.verified}
                avatar={data.avatar}
                deletePost={(e) => deletePostHandler(e, data._id)}
                currentuser={user.username}
              />
            </div>
          ))}
        </form>
      </div>
      <div className="add__tweet">
        <Button className="feed__add__tweet__btn" onClick={tweetBoxHandler}>
          <AddCircleOutlineIcon className="feed__add__icon" />
        </Button>
      </div>
    </div>
  );
}

export default Feed;
