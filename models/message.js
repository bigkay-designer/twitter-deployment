const mongoose =  require ('mongoose')
let Schema = mongoose.Schema

const messages = new Schema ({
    message: String,
    name: String,
    time: String,
})

module.exports = mongoose.model('messages', messages)