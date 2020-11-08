let User = require("./models/user");
let bcrypt = require("bcryptjs");
let localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if(!user) {return done(`Incorrect username`)};
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {            
            return done(null, false, { message: 'Incorrect password.' })
          };
          if (result === true) {
            return done(null, user);
          } else {
            return done('Incorrect password',)
          }        
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        name: user.name,
        id: user._id
      };
      cb(err, userInformation);
    });
  });
};