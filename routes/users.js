let express = require('express'),
    router = express.Router()
    bcrypt = require("bcryptjs"),
    passport = require('passport');

const user = require('../models/user');


router.post("/api/login/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {return next(err);};
      if (!user) res.send("No User Exists");
      req.logIn(user, (err) => {
        if (err) { return next(err)};
        res.send("Successfully Authenticated");
        console.log(`Logged in user:-${req.user.username}`);
      });

    })(req, res, next);
  });

router.route('/api/signup').post((req, res)=>{
    let username = req.body.username
    let name = req.body.name;
    let email = req.body.email
    let verified = req.body.verified

    user.findOne({username: req.body.username}, async (err, data)=>{
        if(err) throw err
        if(data) res.send('user already exist')
        if(!data){
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new user ({username: username,email:email, password: hashPassword, name: name, verified: verified})

            await newUser.save();
            console.log('user added')
            res.send('user')
        }
    })
})

router.route('/api/logout').get((req, res)=>{
  // console.log(`logged out user ${req.user.name}`)
  req.logout();
  req.session.destroy(function (err) {
    if (err) { return next(err); }
    // The response should indicate that the user is no longer authenticated.
    return res.send({ authenticated: req.isAuthenticated() });
  })
    
})

router.get("/api/user", (req, res) => {
    // console.log(req.user)
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });

module.exports = router