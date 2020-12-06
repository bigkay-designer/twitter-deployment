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


//  app.post('/api/upload', (req, res)=>{
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     return res.send({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   })
//  })

// using routes
app.use("/api/post", postRoute)
app.use("/api", userRoute)

app.get('*', (req, res)=>{
    res.send('404 wrong page')
})

let port = process.env.PORT ||3001

app.listen(port, () => console.log(`Server has Started ${port}`))