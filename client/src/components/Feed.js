import React, {useState, useEffect} from 'react'
import axios from '../axios'
import './css/feed.css'
import {Button} from '@material-ui/core'
import {StarOutlined, CropOriginal, InsertEmoticon, Schedule, GifOutlined, AccountCircle, Cancel} from '@material-ui/icons';
import Posts from './Posts';

function Feed() {
 
    const [userPost, setUserPost] = useState([])
    const [postAdded, setPostAdded] = useState()
    // const [postRemoved, setPostRemoved] = useState(0)
    const [user, setUser] = useState({token: undefined, user: undefined})
    const [tweetText, setTweetText] = useState('')
    const [tweetImage, setTweetImage] = useState('')

    useEffect(()=>{
            axios.get("/api/post")
            .then(data => {
                const newPost = data.data
                setUserPost(newPost)
            })
            .catch(err => console.log(`error ${err}`))
    
    }, [postAdded])

    useEffect(()=>{
            axios.get('/api', {headers: {"auth-token": localStorage.getItem("token")}
            })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(`error ${err}`))
    
    }, [])

    const deletePostHandler =(e, dataId) => {
        e.preventDefault()
        axios.delete(`/api/post/posts/${dataId}`)
        .then(posts => {
    
        })
        .catch(err => console.log(`error ${err}`))
        axios.get("/api/post")
        .then(data => {
            const newPost = data.data
            setPostAdded(newPost.length)
            console.log(postAdded)
        })

    }

    const selectFileHandler = (e) =>{
        setTweetImage(URL.createObjectURL(e.target.files[0]))
    }

    const tweetTextHandler = (e)=>{
        setTweetText(e.target.value)
    }

    const closeTweetImgHandler = () =>{
        setTweetImage('')
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const newPost =  {
            displayName: user.name,
            username: user.username,
            text: tweetText,
            image: tweetImage,
            avatar: 'https://polightafricafilms.com/wp-content/uploads/2019/07/avatar_afro_guy-512.png',
            author: {
                id: user.id,
                name: user.name
            }
        } 
        axios.post("/api/post/posts", newPost)
        .then(res => {
            // console.log(res)
        })
        .catch(err => console.log(`error ${err.message}`))

        axios.get("/api/post")
        .then(data => {
            const newPost = data.data
            setPostAdded(newPost.length)
            console.log(postAdded)
        })
        .catch(err => console.log(`error ${err}`))
        setTweetImage('')
        setTweetText('')
    }
   
    const tweetImageBg = {
        background: `url(${tweetImage}) center center / cover no-repeat`,
        width: '100%',
        height: '300px',
        marginBottom: '20px'
    }
    return (
        <div className="feed">
            <div className="feed__container">
                <form onSubmit={submitHandler}>
                    <div className="feed__title">
                        <h1>home</h1>
                        <StarOutlined className="feed__title--icon" />
                    </div>
                    <div className="feed__tweet">
                        <div className="feed__tweet__title">
                            <AccountCircle className="tweet__icon" />
                            <textarea className="feed__input" type="text" value={tweetText} onChange={tweetTextHandler}  cols="30" rows="4">what's happeing?</textarea>
                        </div>
                        {tweetImage ? <div style={tweetImageBg} className="feed__imageFile">
                                 <span onClick={closeTweetImgHandler}> <Cancel className="feed__imageFile--close" /> </span> 
                             </div> : null 
                        }
                        <div className="feed__tweet__attachment">
                            <label htmlFor="file"><CropOriginal className="tweet__attachment__icon" /> </label>
                            <input type="file" id="file" onChange={selectFileHandler} />

                            <GifOutlined className="tweet__attachment__icon gif" />
                            <InsertEmoticon className="tweet__attachment__icon" />
                            <Schedule className="tweet__attachment__icon" /> 
                        </div>
                        <div className="feed__tweet__btn">
                            <Button className="feed__tweet__btn" variant="outlined" type="submit"  >tweet</Button>
                        </div>
                    </div>
                    {/* ************************************************************************** */}
                    <div className="feed__posts">
                        {userPost.map(data=>(
                            <Posts 
                                keys={data._id}
                                displayName={data.displayName}
                                username={data.username}
                                text={data.text}
                                image={data.image}
                                verified={data.verified}
                                avatar={data.avatar}
                                deletePost = {(e)=> deletePostHandler(e, data._id)}
                                currentuser = {user.username}
                            />
                        ))}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Feed
