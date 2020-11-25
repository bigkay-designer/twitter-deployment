import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from '../axios'
import './css/feed.css'
import {Button} from '@material-ui/core'
import {StarOutlined, CropOriginal, InsertEmoticon, Schedule, GifOutlined, AccountCircle, Cancel} from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Posts from './Posts';

function Feed() {
 
    const [userPost, setUserPost] = useState([])
    const [postAdded, setPostAdded] = useState()
    const [user, setUser] = useState({token: undefined, user: undefined})
    const [tweetText, setTweetText] = useState('')
    const [tweetImage, setTweetImage] = useState('')
    const [loggedout, setLoggedOut] = useState(false)
    const [tweetBox, setTweetBox] = useState(false)
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('choose file')
    const [uploadedFile, setUploadedFile] = useState({myFileName: '', filePath: ''})


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
        let handlerFile = e.target.files[0]
        setFile(handlerFile)
        console.log(handlerFile)
    }

    const tweetTextHandler = (e)=>{
        setTweetText(e.target.value)
    }

    const closeTweetImgHandler = () =>{
        setTweetImage('')
    }

    const submitHandler = async (e)=>{
        e.preventDefault();

        // ********************************
        const formData = new FormData()
        formData.append('file', file)
        await axios.post('/api/upload', formData)
        .then(res => {
            setUploadedFile({ myFileName: res.data.fileName, filePath: res.data.filePath});
        })
        .catch (err=>{
            if(err.response.status === 500){
                console.log(err)
            }else{
                console.log(err.response.data)
            }           
        })
        // ********************************
        const newPost =  {
            displayName: user.name,
            username: user.username,
            text: tweetText,
            image: uploadedFile.filePath,
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
        setTweetBox(false)
    }
   
    const tweetImageBg = {
        background: `url(${uploadedFile.filePath}) center center / cover no-repeat`,
        width: '100%',
        height: '300px',
        marginBottom: '20px'
    }
    const logout = ()=>{
        localStorage.removeItem("token")
        setLoggedOut(true)
    }
    
    const tweetBoxHandler = (e) => {
        e.preventDefault()
        setTimeout(() => {
            window.scrollTo(0, 0)
            setTweetBox(true) 
        }, 10)
    }
    const redirectHomeHandler = (e)=>{
        e.preventDefault()
        setTweetBox(false)
    }

    
    return (
        <div className="feed">
            {loggedout ? <Redirect to='/' /> : null }
            <div className="feed__container">
                <form onSubmit={submitHandler}>
                    <div className="feed__title">
                        <div className="feed__user">
                            <Button className="feed__user__btn" onClick={logout} variant="outlined" >logout</Button>
                        </div>
                        <h1>home</h1>
                        <StarOutlined className="feed__title--icon" />
                    </div>
                    <div className={`feed__tweet ${tweetBox? "feed__tweet__popup": null}`}>
                        <div className="feed__tweet__cancle">
                            <h3 onClick={redirectHomeHandler}>Cancel</h3>
                        </div>
                        <div className="feed__tweet__title">
                            <AccountCircle className="tweet__icon" />
                            <textarea className="feed__input" type="text" value={tweetText} placeholder="what's happeing?" onChange={tweetTextHandler}  cols="30" rows="3"></textarea>
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
            <div className="add__tweet">
                <Button className="feed__add__tweet__btn" onClick={tweetBoxHandler}><AddCircleOutlineIcon className="feed__add__icon" /></Button>                
            </div>
        </div>
    )
}

export default Feed