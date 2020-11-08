let mongoose = require('mongoose')

const schema = mongoose.Schema

const user = new schema ({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: String,
    name: String,
    verified: Boolean
})


let users = mongoose.model('user', user)

module.exports = users