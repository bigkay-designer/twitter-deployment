let express = require('express')
let router = express.Router()
let post = require('../models/post')
let user = require('../models/user')
let middlewareObj = require('../middleware/middleware')

router.route('/api/post').get((req, res)=>{
    post.find().sort({_id: -1})
    .then((post) => {
        res.json(post)
    })
    .catch(err => console.log(`error ${err}`))
})

router.route('/api/post').post((req, res)=>{
    let displayName = req.body.displayName;
    let username = req.body.username
    let text = req.body.text;
    let image = req.body.image;
    let verified = req.body.verified
    let avatar = req.body.avatar
    let author = {
        // id: req.user._id,
        username: req.body.username
    }
    let newPost = new post({displayName: displayName, username: username, text: text, image: image, verified: verified, avatar: avatar, author: author})
    newPost.save()
    .then(() => res.json('post added'))
    .catch(err => console.log(`post error ${err}`))
})

const isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        post.findById(req.params.id, (err, post)=>{
            if(err) return next(err)
            if(!post) return console.log('no post was found')
            else{
                if(post.author.username === req.user.username){
                    next()
                }else{
                    next('Permission denied')
                }
            }
        })
    }
}

router.route('/api/post/:id').delete(isAuth, (req, res)=>{
    post.findByIdAndDelete(req.params.id)
    .then((data) =>{ 
        res.json('post deleted')
    })
    .catch(err => res.status(400).json(`error ${err}`))
})

router.route('/api/post/update/:id').post((req, res)=>{
    post.findById(req.params.id)
    .then((post)=>{
        post.username = req.body.username,
        // user.name = req.body.name,
        // user.age = req.body.age

        post.save()
        .then((post)=> res.json(`updated post ${post.username}`))
        .catch(err => res.status(400).json(`error ${err}`))
    })
})

module.exports = router