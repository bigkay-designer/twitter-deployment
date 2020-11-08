// serever

require('dotenv').config()
let log = console.log

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

let postRoute = require('./routes/serverPost')
let userRoute = require('./routes/users')

let user = require('./models/user');


let uri = process.env.ATLAS_TWITTER;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=> log('Connected to the DataBase'))
.catch(err => log(`error ${err}`))

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
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
require("./passportConfig")(passport);

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
 });

// using routes
app.use('/', postRoute)
app.use(userRoute)

app.get('*', (req, res)=>{
    res.send('404 wrong page')
})

let port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server has Started ${port}`))