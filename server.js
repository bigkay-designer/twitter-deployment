// serever

require('dotenv').config()
let log = console.log
const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require('express-fileupload')
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const Pusher = require('pusher')
const app = express();

let postRoute = require('./routes/serverPost')
let userRoute = require('./routes/users')
let messageRoute =  require('./routes/message')

let user = require('./models/user');
let message = require ('./models/message')


let uri = process.env.ATLAS_TWITTER;


const pusher = new Pusher({
  appId: "1119638",
  key: "f9ff0c0b6cf24f35ed0d",
  secret: "c20409e8ad0ae2d7c1b9",
  cluster: "eu",
  useTLS: true
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
// .then(()=> log('Connected to the DataBase'))
// .catch(err => log(`error ${err}`))

const db  = mongoose.connection

db.once("open", ()=>{
  console.log('DB Connected')
  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()
  changeStream.on("change", (change)=>{
    console.log(change)
    if(change.operationType === "insert"){
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message
      });
    }else{
      console.log("pusher trigger error")
    }
  })
})

// Middleware
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(
  session({
    secret: process.env.EXPRESS_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.EXPRESS_SESSION));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
 });

// using routes
app.use("/api/post", postRoute)
app.use("/api", userRoute)
app.use("/api", messageRoute)

app.get('*', (req, res)=>{
    res.send('404 wrong page')
})

let port = process.env.PORT ||3001

app.listen(port, () => console.log(`Server has Started ${port}`))