let express = require('express');
let router = express.Router();
let post = require('../models/post');
let user = require('../models/user');
let middlewareObj = require('../middleware/middleware');
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
  post
    .find()
    .sort({ _id: -1 })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.send(`error ${err}`));
});

router.route('/posts').post((req, res) => {
  let displayName = req.body.displayName;
  let username = req.body.username;
  let text = req.body.text;
  let image = req.body.image;
  let verified = req.body.verified;
  let avatar = req.body.avatar;
  let author = {
    username: req.body.username,
  };
  let newPost = new post({
    displayName: displayName,
    username: username,
    text: text,
    image: image,
    verified: verified,
    avatar: avatar,
    author: author,
  });
  newPost
    .save()
    .then(() => res.json('post added'))
    .catch((err) => res.send(`post error ${err}`));
});

router.route('/posts/:id').delete((req, res) => {
  post
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json('post deleted');
    })
    .catch((err) => res.status(400).json(`error ${err}`));
});

router.route('/posts/update/:id').post((req, res) => {
  post.findById(req.params.id).then((post) => {
    (post.username = req.body.username),
      // user.name = req.body.name,
      // user.age = req.body.age

      post
        .save()
        .then((post) => res.json(`updated post ${post.username}`))
        .catch((err) => res.status(400).json(`error ${err}`));
  });
});

module.exports = router;
