let mongoose = require('mongoose')

const schema = mongoose.Schema

const user = new schema ({
    name: String,
    username: String,
    email: {type: String, unique: true, required: true},
    verified: Boolean,
    password: String,
    msg: {type: String}
})


let users = mongoose.model('user', user)

module.exports = users