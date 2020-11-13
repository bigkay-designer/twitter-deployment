let mongoose = require('mongoose')
const schema = mongoose.Schema

const post = new schema ({
    displayName: '',
    username: '',
    verified: Boolean,
    text: '',
    image : '',
    avatar: '',

    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        username: String
      },
})

const posts = mongoose.model('post', post)

module.exports = posts